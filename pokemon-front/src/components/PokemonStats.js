import React, { useContext } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
import FavoriteContext from '../contexts/FavoriteContexts';


const PokemonStats = (props) => {
    const { pokemon } = props;




    return (
        <div>
            <div className="pokemon-type-detalle">
                <h2 className="pokemon-type-text">Habilidades:</h2>
                {pokemon.abilities.map((ability, indice) => {
                    return (
                        <div>
                            <h2 key={indice} className="pokemon-type-text" >{ability.ability.name} </h2>
                            <div></div>
                        </div>
                    );


                }
                )}
            </div>
            <div>
            <h2>Altura  {pokemon.height} mts</h2>
            <h2>Peso {pokemon.weight} kg</h2>
            </div>
            <div className="pokemon-stats">
                <h2>Experience {pokemon.base_experience}</h2>
                {pokemon.stats.map((stat, indice) => {
                    return (
                        <div>
                            <h2 key={indice} className="pokemon-type-text" > {stat.stat.name} {stat.base_stat} </h2>

                        </div>
                    );


                }
                )}
                
            </div>

        </div>
    );

};
export default PokemonStats;