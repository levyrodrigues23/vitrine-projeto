using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Projects.Endpoints
{
    public record UpdateProjectRequest(
        string? Title,
        ProjectCategory? Category,
        string? Description,
        string? ImageUrl
    );

    public record UpdateProjectResponse(
        Guid Id,
        string Title,
        ProjectCategory Category,
        string Description,
        string ImageUrl
    );

    public class UpdateProjectHandler(AppDbContext db)
    {
        public async Task<UpdateProjectResponse?> Handle(Guid id, UpdateProjectRequest request)
        {
            var project = await db.Projects.FirstOrDefaultAsync(p => p.Id == id);
            if (project is null)
            {
                return null;
            }

            if (!string.IsNullOrWhiteSpace(request.Title))
            {
                project.Title = request.Title;
            }

            if (request.Category.HasValue)
            {
                project.Category = request.Category.Value;
            }

            if (request.Description is not null)
            {
                project.Description = request.Description;
            }

            if (request.ImageUrl is not null)
            {
                project.ImageUrl = request.ImageUrl;
            }

            await db.SaveChangesAsync();

            return new UpdateProjectResponse(
                project.Id,
                project.Title,
                project.Category,
                project.Description,
                project.ImageUrl
            );
        }
    }

    [ApiController]
    [Route("api/projects")]
    public class UpdateProjectController(UpdateProjectHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, UpdateProjectRequest request)
        {
            var result = await handler.Handle(id, request);
            if (result is null) return NotFound();

            return Ok(result);
        }
    }
}
