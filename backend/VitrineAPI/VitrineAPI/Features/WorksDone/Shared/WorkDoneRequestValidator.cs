using FluentValidation;

namespace VitrineAPI.Features.WorksDone.Shared
{
    public class WorkDoneRequestValidator : AbstractValidator<WorkDoneRequest>
    {
        public WorkDoneRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(50).WithMessage("Title must be at most 50 characters");

            RuleFor(x => x.Category)
                .NotEmpty().WithMessage("Category is required")
                .MaximumLength(30).WithMessage("Invalid category. Valid values: Inovação, Extensão, Pesquisa");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(300).WithMessage("Description must be at most 300 characters");

            RuleFor(x => x.ImageUrl)
                .NotEmpty().WithMessage("Image URL is required")
                .Must(url => Uri.IsWellFormedUriString(url, UriKind.Absolute))
                .WithMessage("Invalid image URL format");
        }
    }
}
