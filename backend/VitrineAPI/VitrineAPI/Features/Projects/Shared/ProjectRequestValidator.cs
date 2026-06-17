using FluentValidation;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Projects.Shared
{
    public class ProjectRequestValidator : AbstractValidator<ProjectRequest>
    {
        public ProjectRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(50).WithMessage("Title must be at most 50 characters");

            RuleFor(x => x.Category)
                .NotEmpty().WithMessage("Category is required")
                .Must(c => Enum.TryParse<ProjectCategory>(c, out _))
                .WithMessage("Invalid category. Valid values: Inovação, Extensão, Pesquisa");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(300).WithMessage("Description must be at most 300 characters");
        }
    }
}