using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.WorksDone.Shared
{
     public record WorkDoneResponse(
         Guid Id,
         string Title,
         string Category,
         string Description,
         string ImageUrl,
         Guid ProjectId
     );
}