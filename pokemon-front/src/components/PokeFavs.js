import React, { useContext } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
import FavoriteContext from '../contexts/FavoriteContexts';
import { useState, useEffect } from 'react';
import { buscarPokemon } from "../PokeApi";
import Pokemon from './Pokemon';

const PokeFavs = (props) => {
    const {pokemonesFavoritos} = useContext(FavoriteContext);
    const [pokemones, setPokemones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad]=useState(pokemonesFavoritos.length);

    
    const getPokemonesFavoritos = ( async() => {
        try{ setLoading(true)
         console.log("obteniendo favoritos")
        // var AllPokemones = []
         const promesas = pokemonesFavoritos.map( async (nombre) => {
            
                 const pokemon =  await buscarPokemon(nombre);
                 return pokemon
             
             
         });
         const AllPokemones = await Promise.all(promesas)
         setPokemones(AllPokemones)
         setLoading(false)
     }catch(e){
         console.log("error: "+e)
     }
 
     });



    useEffect(() => {
        getPokemonesFavoritos()
    }, [pokemonesFavoritos.length]);



    
      return(
        <div>
            
            <div><h2>Pokemones Favoritos: ⭐{pokemonesFavoritos.length} </h2></div>
           

          
           
           {//loading? (<div>Cargando pokemones...</div>) :

             
            <div className="pokedex-grid">
               {pokemones.map( (pokemon, indice) => {
                   return (
                       <Pokemon pokemon={pokemon} key={pokemon.name}/>
                   )
               })}
            </div>
               }
            

        </div>

    );

}
export default PokeFavs;
