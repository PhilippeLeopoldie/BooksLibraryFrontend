using System.ComponentModel.DataAnnotations;
namespace myApi.Models;

public class Opinion{
    [Key]
    public int OpinionId { get; set; }

    public bool? Like { get; set; }=true;

    public int? BookId { get; set; }
    public virtual Book? Book { get; set; }
    public int? UserId { get; set; }
    public virtual User? user { get; set; }
}