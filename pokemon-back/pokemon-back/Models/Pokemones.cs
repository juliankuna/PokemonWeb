using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;


namespace pokemon_back.Models
{
    public static class Pokemones
    {
        //Metodos de la clase

        public static List<Pokemon> GetAll()
        {
            List<Pokemon> listaPokemones = new List<Pokemon>();

            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "select * from pokemones";

            DataTable miTabla = new DataTable();
            MySqlDataAdapter miAdaptador = new MySqlDataAdapter();
            miAdaptador.SelectCommand = miComando;

            bool seLeyo;
            try
            {
                miAdaptador.Fill(miTabla);
                seLeyo = true;
            }
            catch (SystemException error)
            {
                Console.WriteLine("Ocurrio un error: " + error.Message);
                seLeyo = false;
            }

            if (seLeyo)
            {
                foreach (DataRow unaFila in miTabla.Rows)
                {
                    Pokemon unPokemon = new Pokemon();
                    unPokemon.id = (int)unaFila["id"];
                    unPokemon.nombre = (string)unaFila["nombre"];
                    unPokemon.vecesbuscado = (int)unaFila["vecesbuscado"];
                    listaPokemones.Add(unPokemon);
                }
            }

            return listaPokemones;
        }

        public static Pokemon GetById(int Id)
        {
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "select * from pokemones where id =@id";
            miComando.Parameters.AddWithValue("@id", Id);


            DataTable miTabla = new DataTable();
            MySqlDataAdapter miAdaptador = new MySqlDataAdapter();
            miAdaptador.SelectCommand = miComando;

            bool seLeyo;
            try
            {
                miAdaptador.Fill(miTabla);
                seLeyo = true;
            }
            catch (SystemException error)
            {
                Console.WriteLine("Ocurrio un error: " + error.Message);
                seLeyo = false;
            }

            Pokemon pokemonBuscado = new Pokemon();

            if (seLeyo)
            {
                if (miTabla.Rows.Count == 1)
                {
                    pokemonBuscado.id = Id;
                    pokemonBuscado.nombre = (string)miTabla.Rows[0]["nombre"];
                    pokemonBuscado.vecesbuscado = (int)miTabla.Rows[0]["vecesbuscado"];
                }
                else
                {
                    pokemonBuscado.id = 0;
                }
            }
            return pokemonBuscado;
        }

        public static List<Pokemon> masBuscados(int cant)
        {

            List<Pokemon> listadoMasBuscados = new List<Pokemon>();

            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "SELECT * from pokemones order by vecesBuscado DESC LIMIT @cant";
            miComando.Parameters.AddWithValue("@cant", cant);

            DataTable miTabla = new DataTable();
            MySqlDataAdapter miAdaptador = new MySqlDataAdapter();
            miAdaptador.SelectCommand = miComando;

            bool seLeyo;
            try
            {
                miAdaptador.Fill(miTabla);
                seLeyo = true;
            }
            catch (SystemException error)
            {
                Console.WriteLine("Ocurrio un error: " + error.Message);
                seLeyo = false;
            }

            if (seLeyo)
            {
                foreach (DataRow unaFila in miTabla.Rows)
                {
                    Pokemon unPokemon = new Pokemon();
                    unPokemon.id = (int)unaFila["id"];
                    unPokemon.nombre = (string)unaFila["nombre"];
                    unPokemon.vecesbuscado = (int)unaFila["vecesbuscado"];
                    listadoMasBuscados.Add(unPokemon);
                }
            }

            return listadoMasBuscados;
        }

        public static Pokemon CreateNew(Pokemon newPoke)
        {
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;

            miComando.CommandText = "insert into pokemones (id,nombre,vecesbuscado) values (@id,@nombre,@vecesbuscado)";
            miComando.Parameters.AddWithValue("@id", newPoke.id);
            miComando.Parameters.AddWithValue("@nombre", newPoke.nombre);
            miComando.Parameters.AddWithValue("@vecesbuscado", 0);


            try
            {
                miComando.ExecuteNonQuery();
            }
            catch (SystemException error)
            {
                Console.WriteLine("Ocurrio un error: " + error.Message);
                newPoke = null;
            }

            return newPoke;
        }

        public static Pokemon AumentoBusqueda(Pokemon pokemonAModificar)
        {
            int contador = pokemonAModificar.vecesbuscado + 1;
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "update pokemones set id=@id,nombre=@nombre,vecesbuscado=@vecesbuscado where id=@id";
            miComando.Parameters.AddWithValue("@id", pokemonAModificar.id);
            miComando.Parameters.AddWithValue("@nombre", pokemonAModificar.nombre);
            miComando.Parameters.AddWithValue("@vecesbuscado", contador);

            try
            {
                miComando.ExecuteNonQuery();
            }
            catch (SystemException error)
            {
                Console.WriteLine("Ocurrio un error: " + error.Message);
                pokemonAModificar = null;
            }

            return pokemonAModificar;
        }


        public static int DeletePoke(int id)
        {
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "DELETE from pokemones where id=@id";
            miComando.Parameters.AddWithValue("@id", id);

            int todoOk = 1;

            try
            {
                miComando.ExecuteNonQuery();
            }
            catch (SystemException error)
            {
                Console.WriteLine("Ocurrio un error: " + error.Message);
                todoOk = 0;
            }

            return todoOk;
        }

    }


    public class Pokemon
    {
        public int id { get; set; }
        public string nombre { get; set; } 
        public int vecesbuscado { get; set; }



    }

}
