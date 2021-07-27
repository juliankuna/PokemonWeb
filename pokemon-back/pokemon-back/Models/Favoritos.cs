using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace pokemon_back.Models
{
    public static class Favoritos
    {
       //METODO DEL LA CLASE Favoritos

 public static int DeleteFav(int user, int pokemon)
        {
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "DELETE from usuarios where id_usuario=@user AND id_pokemon=@pokemon";
            miComando.Parameters.AddWithValue("@user", user);
            miComando.Parameters.AddWithValue("@pokemon", pokemon);

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

        public static List<int> ObtenerFavoritos( int id_user)
        {
            List<int> favoritos = new List<int>();

            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "select id_pokemon from favoritos where id_usuario= @id_user";
            miComando.Parameters.AddWithValue("@id_user", id_user);

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
            
                    favoritos.Add((int)unaFila["id_pokemon"]);
                }
            }

            return favoritos;
        }

        public static Favorito AgregarFavorito(int id_user, int id_pokemon)
        {
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;

            miComando.CommandText = "insert into favoritos (id_usuario,id_pokemon) values (@id_usuario,@id_pokemon)";
            miComando.Parameters.AddWithValue("@id_usuario", id_user);
            miComando.Parameters.AddWithValue("@id_pokemon", id_pokemon);

            Favorito nuevoFav = new Favorito();
            try
            {
                miComando.ExecuteNonQuery();
                nuevoFav.id_usuario = id_user;
                nuevoFav.id_pokemon = id_pokemon;
            }
            catch (SystemException error)
            {
                Console.WriteLine("Ocurrio un error: " + error.Message);
                nuevoFav = null;
            }

            return nuevoFav;
        }
    }

    public class Favorito
    {
        public int id_usuario { set; get; }
        public int id_pokemon { set; get; }
    }
}
