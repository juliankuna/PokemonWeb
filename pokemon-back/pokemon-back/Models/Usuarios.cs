using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace pokemon_back.Models
{
    public static class Usuarios
    {
        //Metodos de la clase

        public static Usuario GetUser(Usuario usuarioBuscado)
        {
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "select id, nombre, apellido from usuarios where mail =@mail AND password = @password";
            miComando.Parameters.AddWithValue("@mail", usuarioBuscado.mail);
            miComando.Parameters.AddWithValue("@password", usuarioBuscado.password);


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

            Usuario usuarioEncontrado = new Usuario();

            if (seLeyo)
            {
                if (miTabla.Rows.Count == 1)
                {
                    usuarioEncontrado.id = (int)miTabla.Rows[0]["id"];
                    usuarioEncontrado.nombre = (string)miTabla.Rows[0]["nombre"];
                    usuarioEncontrado.apellido = (string)miTabla.Rows[0]["apellido"];
                    usuarioEncontrado.mail = usuarioBuscado.mail;
                    usuarioEncontrado.password = usuarioBuscado.password;
                }
                else
                {
                    usuarioEncontrado.id = 0;
                }
            }
            return usuarioEncontrado;
        }

        public static int DeleteUser(int id) 
        {
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "DELETE from usuarios where id=@id";
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

        public static Usuario CreateNew(Usuario nuevoUsuario)
        {
            MySqlCommand miComando = new MySqlCommand();
            miComando.Connection = Util.Util.GetConnection();
            miComando.CommandType = CommandType.Text;
            miComando.CommandText = "select max(id) as nuevo_id from usuarios";
            nuevoUsuario.id = (int)miComando.ExecuteScalar() + 1;
            
            miComando.CommandText = "insert into usuarios (id,nombre,apellido,mail,password) values (@id,@nombre,@apellido,@mail,@password)";
            miComando.Parameters.AddWithValue("@id", nuevoUsuario.id);
            miComando.Parameters.AddWithValue("@nombre", nuevoUsuario.nombre);
            miComando.Parameters.AddWithValue("@apellido", nuevoUsuario.apellido);
            miComando.Parameters.AddWithValue("@mail", nuevoUsuario.mail);
            miComando.Parameters.AddWithValue("@password", nuevoUsuario.password);

            try
            {
                miComando.ExecuteNonQuery();
            }
            catch (SystemException error)
            {
                Console.WriteLine("Ocurrio un error: " + error.Message);
                nuevoUsuario = null;
            }
            
            return nuevoUsuario;
        }
    }

    public class Usuario
    {
        public int id { set; get; }
        public  string nombre { set; get; }
        public  string apellido { set; get; }
        public  string mail { set; get; }
        public  string password { set; get; }
    }
}
