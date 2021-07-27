import React, { useContext } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
import FavoriteContext from '../contexts/FavoriteContexts';
import PokemonStats from './PokemonStats';

const DetallePokemon = (props) => {
    const { pokemon } = props;



    return (
        <div className="detalle-body">
            <div className="pokemon-hd">
                <h1 className="pokemon-titulo">{pokemon.name}</h1>
                <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                    className="pokemon-hd"
                />
                <h2 className="pokemon-type-text">Tipo:  </h2>
                
                <div className="pokemon-type-detalle">
                    
                    {pokemon.types.map((type, indice) => {
                        return (
                            <div>
                                
                                <h2 key={indice} className="pokemon-type-text" >
                                {type.type.name}</h2>
                                </div>
                        )


                    }
                    )}

                    
                </div>
                <h2></h2>
                <PokemonStats pokemon={pokemon} />
            </div>



        </div>
    );

};
export default DetallePokemon;
