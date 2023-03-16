namespace myApi.DTO;

public class BookAddRequest
{
    public int BookId { get; set; }
    public string? Title { get; set; }
    public string? Author { get; set ; }
}