namespace LibraryBackend.Models;

public class Opinion
{
  [key]

  public int OpinionId {get; set;}

  public int? Like {get; set;}=1;

  public string? View {get;set;}

  public string? userName {get; set;} 

  public int? BookId {get;set;}

  [required]
  public Book? Book {get; set;}


}