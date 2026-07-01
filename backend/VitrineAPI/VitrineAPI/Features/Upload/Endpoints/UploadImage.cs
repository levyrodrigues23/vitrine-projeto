using Microsoft.AspNetCore.Mvc;

namespace VitrineAPI.Features.Upload.Endpoints
{
    public record UploadProjectImageResponse(string Url);

    [ApiController]
    [Route("api/upload")]
    public class UploadProjectImageController(IWebHostEnvironment environment) : ControllerBase
    {
        private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg", ".jpeg", ".png", ".webp"
        };

        private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5MB

        [HttpPost("{entity}/image")]
        public async Task<IActionResult> Upload(string entity, IFormFile? file)
        {
            var allowedEntities = new HashSet<string> { "projects", "worksdone", "teachers" };
            if (!allowedEntities.Contains(entity.ToLower()))
                return BadRequest(new { error = "Invalid entity." });

            var webRootPath = environment.WebRootPath
                ?? Path.Combine(environment.ContentRootPath, "wwwroot");

            var uploadDirectory = Path.Combine(webRootPath, "uploads", entity.ToLower());

            if (file is null || file.Length == 0)
                return BadRequest(new { error = "No file was sent." });

            if (file.Length > MaxFileSizeBytes)
                return BadRequest(new { error = "File exceeds the 5MB limit." });

            var extension = Path.GetExtension(file.FileName);
            if (!AllowedExtensions.Contains(extension))
                return BadRequest(new { error = "Unsupported format. Allowed: .jpg, .jpeg, .png, .webp" });

            Directory.CreateDirectory(uploadDirectory);

            var fileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
            var filePath = Path.Combine(uploadDirectory, fileName);

            await using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var publicUrl = $"{Request.Scheme}://{Request.Host}/uploads/{entity.ToLower()}/{fileName}";

            return Ok(new UploadProjectImageResponse(publicUrl));
        }
    }
}
