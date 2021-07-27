using System;
using MySql.Data.MySqlClient;

namespace pokemon_back.Util
{
    public static class Util
    {
        public static MySqlConnection GetConnection()
        {
            MySqlConnection miConexion = new MySqlConnection();
            miConexion.ConnectionString = "Server=127.0.0.1;Uid=root;SslMode=none;Database=pokemonesBD";
            try
            {
                miConexion.Open();
            }
            catch (SystemException error)
            {
                Console.WriteLine("Exploto Todo: " + error.Message);
            }

            return miConexion;
        }
    }
}
