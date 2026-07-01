using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class Teacher
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Lattes { get; set; } = string.Empty;
        public string Field { get; set; } = string.Empty;
        public TeacherAcademicDegree AcademicDegree { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public ICollection<Project> Projects { get; set; } = [];
        public ICollection<WorkDone> WorksDone { get; set; } = [];
    }
}