using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Projects.Endpoints
{
    public record CreateProjectRequest(
        string Title,
        ProjectCategory Category,
        string Description,
        string ImageUrl
    );

    public record CreateProjectResponse(
        Guid Id,
        string Title,
        ProjectCategory Category,
        string Description,
        string ImageUrl
    );

    public class CreateProjectHandler(AppDbContext db)
    {
        public async Task<CreateProjectResponse> Handle(CreateProjectRequest request)
        {
            var project = new Project
            {
                Title = request.Title,
                Category = request.Category,
                Description = request.Description,
                ImageUrl = request.ImageUrl
            };

            await db.AddAsync(project);
            await db.SaveChangesAsync();

            return new CreateProjectResponse(
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
    public class CreateProjectController(CreateProjectHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateProjectRequest request)
        {
            var result = await handler.Handle(request);
            return Created($"/api/projects/{result.Id}", result);
        }
    }
}
