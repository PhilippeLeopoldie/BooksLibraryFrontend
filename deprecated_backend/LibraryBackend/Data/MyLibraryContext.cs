

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Models;


    public class MyLibraryContext : DbContext
    {
        public MyLibraryContext (DbContextOptions<MyLibraryContext> options)
            : base(options)
        {
        }

        public DbSet<LibraryBackend.Models.Opinion> Opinion { get; set; }

        public DbSet<LibraryBackend.Models.Book> Book { get; set; }
    }
