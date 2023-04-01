using System.ComponentModel.DataAnnotations;

namespace myApi.Models;

public class User
{
    [Key] public int UserId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

   
    public List<Opinion>? Opinions { get; set; }

    //public int? BookId { get; set; }
    public List<Book>? Books { get; set; }
}