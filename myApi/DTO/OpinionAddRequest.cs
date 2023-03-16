using System.Text.Json.Serialization;
namespace myApi.DTO;

public class OpinionAddRequest{
    [JsonIgnore]
    public int OpinionId { get; set; }
    public bool Like { get; set; }=true;
    public int? BookId { get; set; }
    public int? UserId { get; set; }
}