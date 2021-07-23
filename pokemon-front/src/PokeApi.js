 
export  const buscarPokemon = async (pokemon) => {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
            const respuesta= await fetch(url);
            const data = await respuesta.json();
            return data;
        } catch (error) {}
    
    };
    
export  const buscarRandom = async (pokemon)=>{
        try{
            let num= Math.round(Math.random()*500);
            let url = "https://pokeapi.co/api/v2/pokemon/"+num;
            const respuesta= await fetch(url);
            const data = await respuesta.json();
            return data;
        }catch (e){

        }
    };

 
    export  const getPokemones = async (limit=30, offset=0) => {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}}`;
            const respuesta= await fetch(url);
            const data = await respuesta.json();
            return data;
        } catch (error) {}
    
    };
    
    export const getPokemonInfo = async (url) => {
        try{
            
            const respuesta= await fetch(url);
            const data = await respuesta.json();
            return data;
        }catch(e){}
    }

/*


*/