namespace VitrineAPI.Features.WorksDone.Shared
{
    public record WorkDoneRequest(
        string Title,
        string Category,
        string Description,
        string ImageUrl
    );
}
