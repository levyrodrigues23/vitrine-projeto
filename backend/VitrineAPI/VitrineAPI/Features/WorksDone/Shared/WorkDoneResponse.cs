using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.WorksDone.Shared
{
     public record WorkDoneResponse(
         Guid Id,
         string Title,
         ProjectCategory Category,
         string Description,
         string ImageUrl,
         Guid ProjectId
     );
}