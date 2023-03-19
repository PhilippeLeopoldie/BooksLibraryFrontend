using System.Text.Json.Serialization;
namespace myApi.DTO;

public class BookAddRequest
{   
    [JsonIgnore]
    public int BookId { get; set; }
    public string? Title { get; set; }
    public string? Author { get; set ; }
}