import React from "react";
import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Pokemon from './Pokemon';
import axios from "axios";
import { buscarPokemon } from "../PokeApi";

const MasBuscados = () => {
    const [pokemones, setPokemones] = useState();
    // const [buscar, setBuscar] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const urlBDD = "https://localhost:5001/api/Pokemon/MasBuscados?cantidad=";
    const [pokemon, setPokemon] = useState();

    const getMasBuscados = (() => {
        if (cantidad == "" || cantidad == 0 || cantidad < 0 || cantidad > 10) {
            alert("No sea nabo, debe ingresar un numero positivo para ver el top")
        } else {
            const cant = cantidad.toString
            const url = urlBDD + cant
            axios.get(url)
                .then(respuesta => {
                    //DEBERIA DEVOLVERME CADA POKEMON DE LA BDD CON SU ESTRUCTURA COMPLETA (PARA PODER REUTILIZAR ESA MISMA DESDE DISTINTOS LUGARES DE LA WEB)
                    console.log("respuesta del get mas buscados: "+ respuesta.data)

                    setPokemones([respuesta.data])

                })

        }
    })

    const getInfo = async (pokemonBDD) => {
        try {

            const pokemon = await buscarPokemon(pokemonBDD.name)
            setPokemon(pokemon)
        } catch (e) {
            console.log("error: " + e)
        }
    }

    useEffect(() => {
        getMasBuscados();
    }, [pokemon]);

    return (
        <div>
            <div>
                <TextField type="number" id="outlined-basic" label="Cantidad a buscar" size="small" variant="outlined" onChange={(e) => setCantidad(e.target.value)} />
                <Button color="primary" variant="contained" size="medium" onClick={ () =>  getMasBuscados()}>Buscar </Button>
            </div>


            <div className="pokedex-grid">
                {pokemones &&
                    pokemones.map((pokemonBDD, indice) => {
                        return (
                            <div>

                                {getInfo(pokemonBDD)}

                                {pokemon &&
                                    <div>
                                        <h2>{indice}</h2> <Pokemon pokemon={pokemon} key={pokemonBDD.name} /> <h2>{pokemonBDD.vecesBuscado} </h2>
                                    </div>

                                }
                            </div>
                        )
                    })}
            </div>

        </div>




    );
}


export default MasBuscados;