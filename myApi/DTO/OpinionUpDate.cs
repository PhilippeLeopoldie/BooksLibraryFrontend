using System.Text.Json.Serialization;
namespace myApi.DTO;

public class OpinionUpDate{
    [JsonIgnore]
    public int OpinionId { get; set; }
    public int Like { get; set; }=1;
     public string? View { get; set; }
     public string? userName { get; set; }
     
    public int? BookId { get; set; }
    [JsonIgnore]
    public int? UserId { get; set; }
}