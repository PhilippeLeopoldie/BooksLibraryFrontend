using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using myApi.Models;

public class myApiContext : DbContext
{
  public myApiContext(DbContextOptions<myApiContext> options)
      : base(options)
  {
  }

  public DbSet<myApi.Models.User> Users { get; set; } = default!;

  public DbSet<myApi.Models.Book> Books { get; set; } = default!;

  public DbSet<myApi.Models.Opinion> Opinions { get; set; } = default!;

  /*  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
   {
       optionsBuilder.UseInMemoryDatabase("MyInMemoryDatabase");
   } */

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<myApi.Models.User>();
    modelBuilder.Entity<myApi.Models.Book>();
    modelBuilder.Entity<myApi.Models.Opinion>();
  }
}
