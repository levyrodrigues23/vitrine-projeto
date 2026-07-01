using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Teachers.Endpoints
{
    public class CreateTeacherHandler(AppDbContext db)
    {
        public async Task<TeacherResponse> Handle(TeacherRequest request)
        {
            var teacher = new Teacher
            {
                Name = request.Name,
                Description = request.Description,
                Email = request.Email,
                Lattes = request.Lattes,
                Field = request.Field,
                AcademicDegree = Enum.Parse<TeacherAcademicDegree>(request.AcademicDegree),
                ImageUrl = request.ImageUrl
            };

            await db.AddAsync(teacher);
            await db.SaveChangesAsync();

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
    public class CreateTeacherController(CreateTeacherHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(TeacherRequest request, IValidator<TeacherRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            return Created($"/api/teachers/{result.Id}", result);
        }
    }
}