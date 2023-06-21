using System.ComponentModel.DataAnnotations;
namespace myApi.Models;

public class Opinion{
    [Key]
    public int OpinionId { get; set; }

    public int? Like { get; set; }=1;
    
    [StringLength(360,ErrorMessage ="Please do not enter values over 360 characters")]
    public string? View { get; set; }
    public string? userName { get; set; }

    public int? BookId { get; set; }

    [Required]
    public Book? Book { get; set; }

    
    //public int? UserId { get; set; }
    //public virtual User? user { get; set; }
}