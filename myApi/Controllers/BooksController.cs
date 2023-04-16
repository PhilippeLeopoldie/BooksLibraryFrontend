using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myApi.Models;
using myApi.DTO;



namespace myApi.Controllers
{

  [Route("api/[controller]")]
  [ApiController]
  public class BooksController : ControllerBase
  {
    private readonly myApiContext _context;

    public BooksController(myApiContext context)
    {
      _context = context;
    }

    // GET: api/Book
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBook()
    {
      if (_context.Books == null)
      {
        return NotFound();
      }
      return await _context.Books.ToListAsync();
    }

    // GET: api/Book/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
      if (_context.Books == null)
      {
        return NotFound();
      }
      var book = await _context.Books.FindAsync(id);

      if (book == null)
      {
        return NotFound();
      }

      return book;
    }

    // PUT: api/Book/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutBook(int id, Book book)
    {
      if (id != book.BookId)
      {
        return BadRequest();
      }

      _context.Entry(book).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!BookExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Book
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Book>> PostBook(BookAddRequest book)
    {
      if (_context.Books == null)
      {
        return Problem("Entity set 'myApiContext.Book'  is null.");
      }

      var newBook = _context.Books.Add(new Book
      {
        Author = book.Author,
        Title = book.Title,
      }).Entity;
      await _context.SaveChangesAsync();


      return CreatedAtAction("GetBook", new { id = newBook.BookId }, newBook);
    }

    // DELETE: api/Book/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
      if (_context.Books == null)
      {
        return NotFound();
      }
      var book = _context.Books.Include(book => book.Opinions).FirstOrDefault(book => book.BookId == id);

      if (book == null)
      {
        return NotFound();
      }

      _context.Books.Remove(book);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool BookExists(int id)
    {
      return (_context.Books?.Any(e => e.BookId == id)).GetValueOrDefault();
    }
  }
}
