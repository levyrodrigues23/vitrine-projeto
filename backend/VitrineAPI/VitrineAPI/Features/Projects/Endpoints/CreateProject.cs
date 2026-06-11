using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Projects.Shared;

namespace VitrineAPI.Features.Projects.Endpoints
{
    public class CreateProjectHandler(AppDbContext db)
    {
        public async Task<ProjectsResponse> Handle(ProjectRequest request)
        {
            var project = new Project
            {
                Title = request.Title,
                Category = Enum.Parse<ProjectCategory>(request.Category!),
                Description = request.Description,
                ImageUrl = request.ImageUrl,

                WorksDone = request.WorksDone.Select(w => new WorkDone
                {
                    Title = w.Title,
                    Category = Enum.Parse<ProjectCategory>(w.Category),
                    Description = w.Description,
                    ImageUrl = w.ImageUrl
                }).ToList()
            };

            await db.AddAsync(project);
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
    public class CreateProjectController(CreateProjectHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(ProjectRequest request, IValidator<ProjectRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            return Created($"/api/projects/{result.Id}", result);
        }
    }
}
