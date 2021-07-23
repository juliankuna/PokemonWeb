import React, { useContext } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
import FavoriteContext from '../contexts/FavoriteContexts';


const PokemonStats = (props) => {
    const { pokemon } = props;




    return (
        <div className="pokemon-stats">
            {pokemon.stats.map((stat, indice) => {
                return (
                    <div>
                        <h2 key={indice} className="pokemon-type-text" >{stat.stat.name} {stat.base_stat}</h2>
                        <div></div>
                    </div>
                )


            }
            )}
        </div>
    );

};
export default PokemonStats;