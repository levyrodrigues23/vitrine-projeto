using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;

namespace VitrineAPI.Features.Teachers.Endpoints
{
    public class DeleteTeacherHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var teacher = await db.Teachers.FindAsync(id);
            if (teacher is null) return false;

            db.Teachers.Remove(teacher);
            await db.SaveChangesAsync();
            return true;
        }
    }

    [ApiController]
    [Route("api/teachers")]
    public class DeleteTeacherController(DeleteTeacherHandler handler) : ControllerBase
    {
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await handler.Handle(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}