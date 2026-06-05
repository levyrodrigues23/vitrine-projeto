using Microsoft.AspNetCore.Mvc;

namespace VitrineAPI.Features.Projects.Endpoints
{
    public record UploadProjectImageResponse(string Url);

    [ApiController]
    [Route("api/uploads")]
    public class UploadProjectImageController(IWebHostEnvironment environment) : ControllerBase
    {
        private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
            ".gif"
        };

        [HttpPost("projects-image")]
        public async Task<IActionResult> Upload(IFormFile? file)
        {
            if (file is null || file.Length == 0)
            {
                return BadRequest("Nenhum arquivo foi enviado.");
            }

            var extension = Path.GetExtension(file.FileName);
            if (!AllowedExtensions.Contains(extension))
            {
                return BadRequest("Formato de imagem não suportado.");
            }

            var webRootPath = environment.WebRootPath;
            if (string.IsNullOrWhiteSpace(webRootPath))
            {
                webRootPath = Path.Combine(environment.ContentRootPath, "wwwroot");
            }

            var uploadDirectory = Path.Combine(webRootPath, "uploads", "projects-image");
            Directory.CreateDirectory(uploadDirectory);

            var fileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
            var filePath = Path.Combine(uploadDirectory, fileName);

            await using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var publicPath = $"/uploads/projects-image/{fileName}";
            var publicUrl = $"{Request.Scheme}://{Request.Host}{publicPath}";

            return Ok(new UploadProjectImageResponse(publicUrl));
        }
    }
}
