using FluentValidation;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Teachers.Shared
{
    public class TeacherRequestValidator : AbstractValidator<TeacherRequest>
    {
        public TeacherRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("The provided email is not valid.");

            RuleFor(x => x.Lattes)
                .NotEmpty().WithMessage("Lattes is required.");

            RuleFor(x => x.Field)
                .NotEmpty().WithMessage("Field is required.");

            RuleFor(x => x.AcademicDegree)
                .NotEmpty().WithMessage("Academic degree is required.")
                .Must(value => Enum.TryParse<TeacherAcademicDegree>(value, out _))
                .WithMessage($"Invalid academic degree. Valid values: {string.Join(", ", Enum.GetNames(typeof(TeacherAcademicDegree)))}");
        }
    }
}