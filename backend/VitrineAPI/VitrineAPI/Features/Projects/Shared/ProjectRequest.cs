using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Projects.Shared
{
    public record ProjectRequest(
        string Title,
        ProjectCategory? Category,
        string Description,
        string ImageUrl
    );
}
