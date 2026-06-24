using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;

namespace VitrineAPI.Features.WorksDone.Endpoints
{
    public class DeleteWorkDoneHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid projectId, Guid workDoneId)
        {
            var workDone = await db.WorksDone
                .Where(w => w.ProjectId == projectId && w.Id == workDoneId)
                .FirstOrDefaultAsync();
            if (workDone == null) return false;
            db.WorksDone.Remove(workDone);
            await db.SaveChangesAsync();
            return true;
        }
    }

    [ApiController]
    [Route("api/projects")]
    public class DeleteWorkDoneController(DeleteWorkDoneHandler handler) : ControllerBase
    {
        [HttpDelete("{projectId}/worksdone/{workDoneId}")]
        public async Task<IActionResult> Delete(Guid projectId, Guid workDoneId)
        {
            var success = await handler.Handle(projectId, workDoneId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
