using System.ComponentModel.DataAnnotations;
namespace myApi.Models;

public class Book
{
    [Key] 
    public int BookId { get; set; }

    public string? Title { get; set; }
    public string? Author { get; set ; }
    
    //public bool Borrowed {get; set; } = false;
   // public DateTime? BorrowedTime {get; set; }
    //public bool GivenBack {get; set; } = false;
    //public DateTime? GivenBackTime {get; set;}

   
    public List<Opinion>? Opinions { get; set; }

    //public int? UserId { get; set; }
    
    //public virtual User? User{get; set;}
    
}

