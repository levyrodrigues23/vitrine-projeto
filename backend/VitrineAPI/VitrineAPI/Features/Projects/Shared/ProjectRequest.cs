using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Projects.Shared
{
    public record ProjectRequest(
        string Title,
        string? Category,
        string Description,
        string ImageUrl
    );
}
