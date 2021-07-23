using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using apiPokemon.Context;
using apiPokemon.Models;
using Npgsql;

namespace apiPokemon.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        //  public IConfiguration Configuration { get; }
        private readonly AppDbContext context;


        public PokemonController(AppDbContext context /*, IConfiguration configuration*/)
        {
            this.context = context;

        }

        //OBTENER TODOS LOS POKEMONES DE LA BDD
        [HttpGet("cantidadFavoritos")]
        public ActionResult Get()
        {
            try
            {
                List<Pokemon> favs = new List<Pokemon>();
                List<Pokemon> pokemones = context.Pokemon.ToList();
                pokemones.ForEach(p =>
                {
                    if (p.favorito == true)
                    {
                        favs.Add(p);
                    }
                });
                return Ok(favs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


         [HttpGet("MasBuscados")]
        public ActionResult Get(string cantidad)
        {
            try
            {
                int cant = Int32.Parse(cantidad);
                List<Pokemon> favs = new List<Pokemon>();
                List<Pokemon> pokemones = context.Pokemon.FromSqlRaw("SELECT * from "+'"'+"Pokemon"+'"'+" order by vecesBuscado DESC  FETCH FIRST "+cant+" ROWS ONLY;").ToList();
                     //   FromSqlRaw("SQL SCRIPT").ToList();
                pokemones.ForEach(poke =>{
                    Console.WriteLine("nombre+ "+poke.nombre);
                });
                return Ok(pokemones);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        //OBTENER EL POKEMON CON ESE ID
        [HttpGet("{id}", Name = "GetPokemon")]
        public ActionResult Get(int id)
        {
            try
            {
                var pokemon = context.Pokemon.FirstOrDefault(p => p.id == id);
                return Ok(pokemon);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //INSERTAR UN POKEMON
        [HttpPost]
        public ActionResult Post([FromBody] Pokemon pokemon)
        {
             try
            {
                context.Pokemon.Add(pokemon);
                context.SaveChanges();
                //retornamos el pokemon insertado en la bdd
                return CreatedAtRoute("GetPokemon", new { id = pokemon.id }, pokemon);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //MODIFICAR UN POKEMON
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Pokemon pokemon)
        {
            try
            {
                if (pokemon.id == id)
                {
                    context.Entry(pokemon).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetPokemon", new { id = pokemon.id }, pokemon);

                }
                else
                {
                    return BadRequest("No se puede modificar un pokemon con un id no registrado");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //ELIMINAR UN POKEMON
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            try
            {
               context.Pokemon.RemoveRange(context.Pokemon);
               context.SaveChanges();
                    return Ok("BDD reinciada");
                
               
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
