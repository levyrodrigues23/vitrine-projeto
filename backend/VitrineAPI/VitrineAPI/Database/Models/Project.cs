using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class Project
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public ProjectCategory Category { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public ICollection<WorkDone> WorksDone { get; set; } = [];
    }
}