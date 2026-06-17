using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Projects.Shared;

namespace VitrineAPI.Features.Projects.Endpoints
{
    public class UpdateProjectHandler(AppDbContext db)
    {
        public async Task<ProjectsResponse?> Handle(Guid id, ProjectRequest request)
        {
            var project = await db.Projects.FindAsync(id);
            if (project is null) return null;
            project.Title = request.Title;
            project.Category = Enum.Parse<ProjectCategory>(request.Category!);
            project.Description = request.Description;
            project.ImageUrl = request.ImageUrl;
            await db.SaveChangesAsync();
            return new ProjectsResponse(
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
        public async Task<IActionResult> Update(Guid id, ProjectRequest request, IValidator<ProjectRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(id, request);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}
