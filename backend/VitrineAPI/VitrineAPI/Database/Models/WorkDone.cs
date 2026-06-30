using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class WorkDone
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public Guid ProjectId { get; set; }
        public Project Project { get; set; } = null!;
        public Guid? ResponsibleId { get; set; }
        public Teacher? Responsible { get; set; }

    }
}