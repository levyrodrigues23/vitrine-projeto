using System.Text.Json.Serialization;

namespace VitrineAPI.Database.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProjectCategory
    {
        Inovação,
        Extensão,
        Pesquisa
    }
}
