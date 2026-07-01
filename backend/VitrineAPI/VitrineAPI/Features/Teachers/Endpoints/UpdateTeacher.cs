using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Teachers.Endpoints
{
    public class UpdateTeacherHandler(AppDbContext db)
    {
        public async Task<TeacherResponse?> Handle(Guid id, TeacherRequest request)
        {
            var teacher = await db.Teachers.FindAsync(id);
            if (teacher is null) return null;

            teacher.Name = request.Name;
            teacher.Description = request.Description;
            teacher.Email = request.Email;
            teacher.Lattes = request.Lattes;
            teacher.Field = request.Field;
            teacher.AcademicDegree = Enum.Parse<TeacherAcademicDegree>(request.AcademicDegree);

            await db.SaveChangesAsync();

            return new TeacherResponse(
                teacher.Id,
                teacher.Name,
                teacher.Description,
                teacher.Email,
                teacher.Lattes,
                teacher.Field,
                teacher.AcademicDegree.ToString()
            );
        }
    }

    [ApiController]
    [Route("api/teachers")]
    public class UpdateTeacherController(UpdateTeacherHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, TeacherRequest request, IValidator<TeacherRequest> validator)
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