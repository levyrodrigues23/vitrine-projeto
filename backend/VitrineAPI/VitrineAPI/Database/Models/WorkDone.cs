using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class WorkDone
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public ProjectCategory Category { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public Guid ProjectId { get; set; }
        public Project Project { get; set; } = null!;
    }
}