using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Teachers.Endpoints
{
    public class GetTeacherByIdHandler(AppDbContext db)
    {
        public async Task<TeacherResponse?> Handle(Guid id)
        {
            var teacher = await db.Teachers.FindAsync(id);
            if (teacher is null) return null;

            return new TeacherResponse(
                teacher.Id,
                teacher.Name,
                teacher.Description,
                teacher.Email,
                teacher.Lattes,
                teacher.Field,
                teacher.AcademicDegree.ToString(),
                teacher.ImageUrl
            );
        }
    }

    [ApiController]
    [Route("api/teachers")]
    public class GetTeacherByIdController(GetTeacherByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}