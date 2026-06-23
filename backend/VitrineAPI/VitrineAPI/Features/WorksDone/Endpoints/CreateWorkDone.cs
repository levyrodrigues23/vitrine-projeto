using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Features.WorksDone.Shared;

namespace VitrineAPI.Features.WorksDone.Endpoints
{
    public class CreateWorkDoneHandler(AppDbContext db)
    {
        public async Task<WorkDoneResponse> Handle(Guid projectId, WorkDoneRequest request)
        {
            var workDone = new WorkDone
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Category = request.Category,
                Description = request.Description,
                ImageUrl = request.ImageUrl,
                ProjectId = projectId
            };
            await db.AddAsync(workDone);
            await db.SaveChangesAsync();

            return new WorkDoneResponse(
                workDone.Id,
                workDone.Title,
                workDone.Category,
                workDone.Description,
                workDone.ImageUrl,
                workDone.ProjectId);
        }
    }

    [ApiController]
    [Route("api/projects")]
    public class CreateWorkDoneController(CreateWorkDoneHandler handler) : ControllerBase
    {
        [HttpPost("{projectId}/worksdone")]
        public async Task<IActionResult> Create(Guid projectId, WorkDoneRequest request, IValidator<WorkDoneRequest> validator)
        {
            var result = await handler.Handle(projectId, request);
            return Created($"/api/worksdone/{result.Id}", result);
        }
    }
}
