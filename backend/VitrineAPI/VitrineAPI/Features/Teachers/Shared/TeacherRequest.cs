namespace VitrineAPI.Features.Teachers.Shared
{
    public record TeacherRequest(
        string Name,
        string Description,
        string Email,
        string Lattes,
        string Field,
        string AcademicDegree,
        string ImageUrl
    );
}
