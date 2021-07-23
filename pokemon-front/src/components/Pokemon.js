import React, {useContext} from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
import FavoriteContext from '../contexts/FavoriteContexts';


const Pokemon = (props) => {
    const {pokemon} = props;
    const {pokemonesFavoritos, updateFavoritos} = useContext(FavoriteContext);

    const blackStar= "★";
    const star= "⭐";
    const fav = pokemonesFavoritos.includes(pokemon.name) ? star : blackStar;

    const clickFav = (e) => {
       // e.preventDefault();
        console.log("click fav")
        console.log("favorito: "+pokemon.name)
        console.log("favoritos antes del click: "+ pokemonesFavoritos.length)
        updateFavoritos(pokemon.name)
    }

    // try{
        return (
            <div className="pokemon-card">
                <div className="pokemon-img-container">
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="pokemon-img"
                    />
                </div>
                <div className="card-body">
                        <div className="card-top">
                            <h3>{pokemon.name}</h3>
                            <div>#{pokemon.id}</div>
                        </div>
                        <div className="card-bottom">
                            <div className="pokemon-type">
                                {pokemon.types.map( (type, indice) =>{
                                    return(
                                        <div key={indice} className="pokemon-type-text" >
                                        {type.type.name}</div>
                                    )
                                       
                                    
                                }                       
                                )}
                            </div>
                            <div className="favButton"><Button onClick={() => clickFav()}>{fav}</Button></div>
                        </div>
                </div>
            </div>
            );
    // }catch (e){
    //     console.log("error: "+e)
    // }
    
};
export default Pokemon;