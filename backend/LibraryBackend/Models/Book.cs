namespace LibraryBackend.Models;
using System.ComponentModel.DataAnnotations;

public class Book
{
  [Key]
  public int BookId {get; set;}
  public string ? Title {get;set;}
  public string ? Author {get; set;}

  public List<Opinion>? Opinions {get;set;}
}