using System.Text.Json.Serialization;

namespace VitrineAPI.Database.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TeacherAcademicDegree
    {
        Graduação,
        Pós_Graduação,
        Mestrado,
        Doutorado,
        Pós_Doutorado
    }
}
