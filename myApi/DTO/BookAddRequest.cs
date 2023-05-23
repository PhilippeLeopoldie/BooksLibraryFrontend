using System.Text.Json.Serialization;
namespace myApi.DTO;

public class BookAddRequest
{   
    
    public string? Title { get; set; }
    public string? Author { get; set ; }
}