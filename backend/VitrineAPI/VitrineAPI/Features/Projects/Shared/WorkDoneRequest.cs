namespace VitrineAPI.Features.Projects.Shared
{
    public record WorkDoneRequest(
        string Title,
        string Category,
        string Description,
        string ImageUrl
    );
}
