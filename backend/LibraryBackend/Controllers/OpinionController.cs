using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Models;
using LibraryBackend.Dto;

namespace LibraryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpinionController : ControllerBase
    {
        private readonly MyLibraryContext _context;

        public OpinionController(MyLibraryContext context)
        {
            _context = context;
        }

        // GET: api/Opinion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Opinion>>> GetOpinion()
        {
            return await _context.Opinion.ToListAsync();
        }

        // GET: api/Opinion/5
        [HttpGet("{id}")]
        public ActionResult<Opinion> GetOpinionById(int id)
        {
            var opinion = _context.Opinion.Include(x => x.Book).FirstOrDefault(x => x.OpinionId == id);

            if (opinion == null)
            {
                return NotFound();
            }

            return opinion;
        }

        // PUT: api/Opinion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOpinion(int id, Opinion opinion)
        {
            if (id != opinion.OpinionId)
            {
                return BadRequest();
            }

            _context.Entry(opinion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OpinionExists(id))
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

        // POST: api/Opinion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Opinion>> PostOpinion(OpinionAddRequest opinion)
        {
            _context.Opinion.Add(new Opinion{
                Like = opinion.Like,
                BookId = opinion.BookId,
                View = opinion.View,
                userName = opinion.userName
            });
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOpinion", new { id = opinion.OpinionId }, opinion);
        }

        // DELETE: api/Opinion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOpinion(int id)
        {
            var opinion = await _context.Opinion.FindAsync(id);
            if (opinion == null)
            {
                return NotFound();
            }

            _context.Opinion.Remove(opinion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OpinionExists(int id)
        {
            return _context.Opinion.Any(e => e.OpinionId == id);
        }
    }
}
