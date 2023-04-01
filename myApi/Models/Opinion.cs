using System.ComponentModel.DataAnnotations;
namespace myApi.Models;

public class Opinion{
    [Key]
    public int OpinionId { get; set; }

    public bool? Like { get; set; }=true;
    public string? View { get; set; }
    public string? userName { get; set; }

    public int? BookId { get; set; }

    [Required]
    public Book? Book { get; set; }

    
    //public int? UserId { get; set; }
    //public virtual User? user { get; set; }
}