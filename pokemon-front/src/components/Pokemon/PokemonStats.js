import React, { useContext } from 'react';
import '../../App.css';
import { Button } from '@material-ui/core';
import FavoriteContext from '../../contexts/FavoriteContexts';


const PokemonStats = (props) => {
    const { pokemon } = props;




    return (
        <div >
            <table className="pokemon-type-detalle">
                <tr>
                    <td><h2 className="pokemon-type-text">Habilidades:</h2></td>
                    <td>
                        {pokemon.abilities.map((ability, indice) => {
                            return (

                                <tr>
                                    <h2 key={indice} className="pokemon-type-text" >{ability.ability.name} </h2>

                                </tr>
                            );


                        }
                        )}

                    </td>
                </tr>
             
            </table>
            <div className="pokemon-type-detalle-2" >                 
                    <h2 className="pokemon-type-text">Altura: {pokemon.height / 10} mts</h2>
                    <h2 className="pokemon-type-text">Peso: {pokemon.weight / 10} kg</h2>              
            </div>
            <table className="pokemon-stats">
                <h2 className="pokemon-type-text">Experience {pokemon.base_experience}</h2>
                {pokemon.stats.map((stat, indice) => {
                    return (
                        <div className="pokemon-type-detalle-2">
                            <div>
                            <h2 key={indice} className="pokemon-type-text" > {stat.stat.name} {stat.base_stat}</h2>
                                </div>

                        </div>
                    );


                }
                )}

            </table>

        </div>
    );

};
export default PokemonStats;