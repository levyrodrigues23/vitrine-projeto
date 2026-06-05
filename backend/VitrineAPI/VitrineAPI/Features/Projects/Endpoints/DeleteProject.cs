using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;

namespace VitrineAPI.Features.Projects.Endpoints
{
    public class DeleteProjectHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var project = await db.Projects.FirstOrDefaultAsync(p => p.Id == id);
            if (project is null)
            {
                return false;
            }

            db.Projects.Remove(project);
            await db.SaveChangesAsync();

            return true;
        }
    }

    [ApiController]
    [Route("api/projects")]
    public class DeleteProjectController(DeleteProjectHandler handler) : ControllerBase
    {
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await handler.Handle(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
