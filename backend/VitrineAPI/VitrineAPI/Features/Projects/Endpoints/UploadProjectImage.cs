using Microsoft.AspNetCore.Mvc;

namespace VitrineAPI.Features.Projects.Endpoints
{
    public record UploadProjectImageResponse(string Url);

    [ApiController]
    [Route("api/projects")]
    public class UploadProjectImageController(IWebHostEnvironment environment) : ControllerBase
    {
        private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg", ".jpeg", ".png", ".webp"
        };

        private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5MB

        [HttpPost("image")]
        public async Task<IActionResult> Upload(IFormFile? file)
        {
            if (file is null || file.Length == 0)
                return BadRequest(new { error = "No file was sent." });

            if (file.Length > MaxFileSizeBytes)
                return BadRequest(new { error = "File exceeds the 5MB limit." });

            var extension = Path.GetExtension(file.FileName);
            if (!AllowedExtensions.Contains(extension))
                return BadRequest(new { error = "Unsupported format. Allowed: .jpg, .jpeg, .png, .webp" });

            var webRootPath = environment.WebRootPath
                ?? Path.Combine(environment.ContentRootPath, "wwwroot");

            var uploadDirectory = Path.Combine(webRootPath, "uploads", "projects");
            Directory.CreateDirectory(uploadDirectory);

            var fileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
            var filePath = Path.Combine(uploadDirectory, fileName);

            await using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var publicUrl = $"{Request.Scheme}://{Request.Host}/uploads/projects/{fileName}";

            return Ok(new UploadProjectImageResponse(publicUrl));
        }
    }
}
