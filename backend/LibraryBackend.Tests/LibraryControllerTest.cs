namespace LibraryBackend.Tests;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Models;
using LibraryBackend.Controllers;



public abstract class LibraryControllerTest
{
  public LibraryControllerTest(DbContextOptions<MyLibraryContext> contextOptions)
  {
    ContextOptions = contextOptions;
    Seed();
    
  }

  protected DbContextOptions<MyLibraryContext> ContextOptions{ get;}

  private void Seed()
  {
    using(var context = new MyLibraryContext (ContextOptions))
    {
      context.Database.EnsureDeleted();
      context.Database.EnsureCreated();

      

      var bookOne = new Book {
        
        Title="bookOne title",
        Author="bookOne author"
      };
      var bookTwo = new Book {
        
        Title="bookTwo title",
        Author="bookTwo author"
      };
      var bookThree = new Book {
        
        Title="bookThree title",
        Author="bookThree author"
      };

      context.AddRange(bookOne,bookTwo,bookThree);
      context.SaveChanges();
    }
    
  }

  [Fact]

  public async void Should_get_3_books()
  {
    using(var context = new MyLibraryContext(ContextOptions))
    {
      var controller = new BookController(context);

      var books = await controller.GetBook();
      

      Assert.Equal(3,books?.Value?.Count());
      Assert.Equal(1,books?.Value?.ElementAt(0).BookId);
      Assert.Equal("bookTwo author",books?.Value?.ElementAt(1).Author);
      Assert.Equal("bookThree title",books?.Value?.ElementAt(2).Title);
    }

  }

}