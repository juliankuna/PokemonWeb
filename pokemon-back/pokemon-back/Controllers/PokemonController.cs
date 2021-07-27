using Microsoft.AspNetCore.Mvc;
using pokemon_back.Models;
using System.Collections.Generic;

namespace pokemon_back.Controllers
{
    [ApiController]
    [Route("api/Pokemon")]
    public class PokemonController : ControllerBase
    { 

        //---------------------------------------------------------------METODOS GET------------------------------------------------------------------------
       [HttpGet]
        public IActionResult GetAll()
        {
            List<Pokemon> listaPokemones = Pokemones.GetAll();

            if (listaPokemones.Count > 0)
            {
                return Ok(listaPokemones);
            }
            else
            {
                return NotFound("No hay pokemones registrados");
            }
            
        }

        [HttpGet("{Id}")]
        public IActionResult GetById(int id)
        {
            Pokemon unPokemon = Pokemones.GetById(id);

            if (unPokemon.id !=0)
            {
                return Ok(unPokemon);
            }
            else
            {
                return NotFound("No existe un pokemon con ese ID");
            }

        }

        [HttpGet("user")] //los parametros del body serian el usuario y la contraseña
        public IActionResult GetUser(Usuario usuarioBuscado)
        {
            Usuario unUsuario = Usuarios.GetUser(usuarioBuscado);
           
            if (unUsuario.id != 0)
            {
                return Ok(unUsuario);
            }
            else
            {
                return NotFound("Usuario o Contraseña Incorrectos");
            }
        }

        [HttpGet("MasBuscados/{cant}")]
        public IActionResult MasBuscados(int cant)
        {
            
            List<Pokemon> listaPokemones = Pokemones.masBuscados(cant);

            if (listaPokemones.Count > 0)
            {
                return Ok(listaPokemones);
            }
            else
            {
                return NotFound("No hay pokemones registrados");
            }
            
        }

        [HttpGet("favoritos/{Id}")]
        public IActionResult BuscarFavoritos(int Id)
        {
            List<int> favs = Favoritos.ObtenerFavoritos(Id);

            if (favs.Count > 0)
            {
                List<Pokemon> listaPokemones = new List<Pokemon>();

                foreach ( int idPokemon in favs)
                {
                    Pokemon unPokemon = Pokemones.GetById(idPokemon);

                    listaPokemones.Add(unPokemon);
                }

                return Ok(listaPokemones);
            }
            else
            {
                return NotFound("No hay pokemones registrados");
            }
        }

        //---------------------------------------------------------------------METODOS POST-----------------------------------------------------

        [HttpPost("user")]
        public IActionResult CreateUser(Usuario usuarioNuevo)
        {
            Usuario newUser = Usuarios.CreateNew(usuarioNuevo);

            if (newUser != null)
            {
                return Ok(newUser);
            }
            else
            {
                return NotFound("Error al crear el usuario");
            }
        }

        
        [HttpPost("fav/{user}/{pokemon}")]
        public IActionResult AgregarFavorito(int user, int pokemon)
        {
            Favorito newFav = Favoritos.AgregarFavorito(user, pokemon);

            if (newFav != null)
            {
                return Ok("Se agrego correctamente el favorito al usuario " + newFav.id_usuario);
            }
            else
            {
                return NotFound("Error al cargar el  pokemon favorito");
            }
        }
        

        [HttpPost("pokemon")]
        public IActionResult CreatePokemon(Pokemon nuevoPoke)
        {
            Pokemon newPokemon = Pokemones.CreateNew(nuevoPoke);

            if (newPokemon != null)
            {
                return Ok(newPokemon);
            }
            else
            {
                return NotFound("Error al crear el pokemon");
            }
        }
        //---------------------------------------------------------------------METODOS PUT-------------------------------------------------------
        
         [HttpPut]
        public IActionResult Update(Pokemon pokemonAModificar)
        {
            Pokemon pokemonModificado = Pokemones.AumentoBusqueda(pokemonAModificar);

            if (pokemonModificado != null)
            {
                return Ok("El buscador se incremento correctamente!");
            }
            else
            {
                return NotFound("Error al aumentar el contador");
            }

        }
        
        //---------------------------------------------------------------------METODOS DELETE----------------------------------------------------
       [HttpDelete("user/{Id}")]
        public IActionResult DeleteUser(int Id)
        {
            int SeBorro = Usuarios.DeleteUser(Id);

            if (SeBorro == 1)
            {
                return Ok("El usuario se borro correctamente!");
            }
            else
            {
                return NotFound("No se pudo eliminar el usuario");
            }
        }

        [HttpDelete("fav/{user}/{pokemon}")]
        public IActionResult DeleteFav( int user, int pokemon)
        {
            int SeBorro = Favoritos.DeleteFav(user, pokemon);

            if (SeBorro == 1)
            {
                return Ok("El favorito se borro correctamente!");
            }
            else
            {
                return NotFound("No se pudo eliminar el favorito");
            }
        }

        [HttpDelete("pokemon/{Id}")]
        public IActionResult DeletePoke(int Id)
        {
            int SeBorro = Pokemones.DeletePoke(Id);

            if (SeBorro == 1)
            {
                return Ok("El pokemon se borro correctamente!");
            }
            else
            {
                return NotFound("No se pudo eliminar el pokemon");
            }
        }
    }


    
}
