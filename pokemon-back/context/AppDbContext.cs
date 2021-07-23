using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using apiPokemon.Models;
namespace apiPokemon.Context
{
    public class AppDbContext : DbContext
    {
        
        public AppDbContext (DbContextOptions<AppDbContext> options) : base (options)
        {

        }

        public DbSet<Pokemon> Pokemon {get; set; }
    }
    
}