
namespace apiPokemon.Models{
    public class Pokemon{
        public int id { get; set; }
        public string nombre { get; set; }

        public int vecesbuscado { get; set; }
       
        public bool favorito {get; set; } 
        public Pokemon()
        {
            
        }

        public Pokemon(int id, string nombre){
            this.id = id;
            this.nombre = nombre;
            this.vecesbuscado = 0;
            this.favorito = false;
        }
        
        public int getid (){
            return this.id;
        }

        public void setId(int id){
            this.id=id;
        }

        public string getNombre(){
            return this.nombre;
        }

        public void setNombre(string nombre){
            this.nombre = nombre;
        }

        public int getvecesBuscado(){
            return this.vecesbuscado;
        }

        public void setvecesBuscado(int num){
            this.vecesbuscado = num;
        }

        public bool getFavorito(){
            return this.favorito;
        }

        public void setFavorito(bool fav){
            this.favorito = fav;
        }
        
    }
}