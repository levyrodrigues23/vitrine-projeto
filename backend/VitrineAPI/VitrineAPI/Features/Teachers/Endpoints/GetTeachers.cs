using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Teachers.Endpoints
{
    public class GetTeachersHandler(AppDbContext db)
    {
        public async Task<List<TeacherResponse>> Handle()
        {
            return await db.Teachers
                .AsNoTracking()
                .Select(t => new TeacherResponse(
                    t.Id,
                    t.Name,
                    t.Description,
                    t.Email,
                    t.Lattes,
                    t.Field,
                    t.AcademicDegree.ToString()))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/teachers")]
    public class GetTeachersController(GetTeachersHandler handler) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}