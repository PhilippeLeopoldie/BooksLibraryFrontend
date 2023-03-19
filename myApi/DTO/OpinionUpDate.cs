using System.Text.Json.Serialization;
namespace myApi.DTO;

public class OpinionUpDate{
    [JsonIgnore]
    public int OpinionId { get; set; }
    public bool Like { get; set; }=true;
     public string? View { get; set; }
     public string? userName { get; set; }
     [JsonIgnore]
    public int? BookId { get; set; }
    [JsonIgnore]
    public int? UserId { get; set; }
}