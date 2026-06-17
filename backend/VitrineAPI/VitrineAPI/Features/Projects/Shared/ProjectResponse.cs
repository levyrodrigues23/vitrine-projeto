using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Projects.Shared
{
    public record ProjectsResponse(
        Guid Id,
        string Title,
        ProjectCategory Category,
        string Description,
        string ImageUrl
    );
}
