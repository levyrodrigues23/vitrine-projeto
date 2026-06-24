using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.WorksDone.Shared;

namespace VitrineAPI.Features.WorksDone.Endpoints
{
    public class UpdateWorkDoneHandler(AppDbContext db)
    {
        public async Task<WorkDoneResponse?> Handle(Guid projectId, Guid workDoneId, WorkDoneRequest request)
        {
            var workDone = await db.WorksDone
                .Where(w => w.ProjectId == projectId && w.Id == workDoneId)
                .FirstOrDefaultAsync();
            if (workDone == null) return null;
            workDone.Title = request.Title;
            workDone.Category = request.Category;
            workDone.Description = request.Description;
            workDone.ImageUrl = request.ImageUrl;
            await db.SaveChangesAsync();
            return new WorkDoneResponse(
                workDone.Id,
                workDone.Title,
                workDone.Category,
                workDone.Description,
                workDone.ImageUrl,
                workDone.ProjectId
            );
        }
    }

    [ApiController]
    [Route("api/projects")]
    public class UpdateWorkDoneController(UpdateWorkDoneHandler handler) : ControllerBase
    {
        [HttpPut("{projectId}/worksdone/{workDoneId}")]
        public async Task<IActionResult> Update(Guid projectId, Guid workDoneId, WorkDoneRequest request, IValidator<WorkDoneRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(projectId, workDoneId, request);
            if (result == null) return NotFound();
            return Ok(result);
        }
    }
}
