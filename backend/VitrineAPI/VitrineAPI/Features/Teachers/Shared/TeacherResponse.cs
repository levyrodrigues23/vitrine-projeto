namespace VitrineAPI.Features.Teachers.Shared
{
    public record TeacherResponse(
        Guid Id,
        string Name,
        string Description,
        string Email,
        string Lattes,
        string Field,
        string AcademicDegree,
        string ImageUrl
    );
}
