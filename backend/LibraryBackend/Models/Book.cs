namespace LibraryBackend.Models;

public class Book
{
  [key]
  public int BookId {get; set;}
  public string ? Title {get;set;}
  public string ? Author {get; set;}
}