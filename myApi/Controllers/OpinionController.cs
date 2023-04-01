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
    public class OpinionsController : ControllerBase
    {
        private readonly myApiContext _context;

        public OpinionsController(myApiContext context)
        {
            _context = context;
        }

        // GET: api/Opinion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Opinion>>> GetOpinion()
        {
          if (_context.Opinions == null)
          {
              return NotFound();
          }
            return await _context.Opinions.ToListAsync();
        }

        // GET: api/Opinion/5
        [HttpGet("{id}")]
        public  ActionResult<Opinion> GetOpinionById(int id)
        {
          if (_context.Opinions == null)
          {
              return NotFound();
          }
            var opinion = _context.Opinions.Include(x=> x.Book).FirstOrDefault(x=>x.OpinionId==id);

            if (opinion == null)
            {
                return NotFound();
            }

            return opinion;
        }

        // PUT: api/Opinion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOpinion(int id, OpinionUpDate opinionUpdate)
        {
            /* if (id != opinion.OpinionId)
            {
                return BadRequest();
            } */
            var opinionById =  GetOpinionById(id);
            
            
            if(opinionById.Value != null)
            {
                opinionById.Value.Like=opinionUpdate.Like;
                //opinionById.Value.UserId=opinionUpdate.UserId;
               
                opinionById.Value.View=opinionUpdate.View;
                opinionById.Value.userName=opinionUpdate.userName;
                //_context.Entry(opinionById.Value).State = EntityState.Modified;
            }

            try
            {
                _context.Opinions.Update(opinionById.Value!);
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

            return Ok();
        }

        // POST: api/Opinion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Opinion>> PostOpinion(OpinionAddRequest opinion)
        {
          if (_context.Opinions == null)
          {
              return Problem("Entity set 'myApiContext.Opinion'  is null.");
          }
          
            _context.Opinions.Add(new Opinion{
                Like= opinion.Like,
                
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
            if (_context.Opinions == null)
            {
                return NotFound();
            }
            
            //var opinion = await _context.Opinions.FindAsync(id);
            var opinion = _context.Opinions.FirstOrDefault(x =>x.OpinionId==id);
            if (opinion == null)
            {
                return NotFound();
            }

            _context.Opinions.Remove(opinion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OpinionExists(int id)
        {
            return (_context.Opinions?.Any(e => e.OpinionId == id)).GetValueOrDefault();
        }
    }
}
