import React from "react";
import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Pokemon from './Pokemon';
import axios from "axios";
import { buscarPokemon } from "../PokeApi";

const MasBuscados = () => {
    // const [buscar, setBuscar] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const urlBDD = "http://localhost:5000/api/Pokemon/MasBuscados/";
    const [pokemon, setPokemon] = useState("");
    const [arrayPokemones, setArrayPokemones] = useState([]);
    const [bandera, setBandera] = useState(false);

    const getMasBuscados = (() => {
        if (cantidad == "" || cantidad == 0 || cantidad < 0 || cantidad > 10) {
            alert("No sea nabo, debe ingresar un numero positivo para ver el top")
        } else {

            const url = urlBDD + cantidad
            console.log("url:" + url)
            axios.get(url)
                .then(respuesta => {
                    //DEBERIA DEVOLVERME CADA POKEMON DE LA BDD CON SU ESTRUCTURA COMPLETA (PARA PODER REUTILIZAR ESA MISMA DESDE DISTINTOS LUGARES DE LA WEB)
                    console.log("respuesta del get mas buscados: " + respuesta.data)




                    //const pokemon = buscarPokemon(pokemonBDD.name)
                    getInfo(respuesta.data)


                })

        }
    })

    const getInfo = (pokes) => {
        const array = []


        pokes.forEach(pokemonBDD => {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemonBDD.nombre}`;
            fetch(url)
                .then(respuesta => {
                    respuesta.text()
                        .then(datosLeidos => {
                            let estructura = { pokemon: "pokemon", busquedas: 0 };
                            const poke = JSON.parse(datosLeidos);
                            estructura.pokemon = poke
                            estructura.busquedas = pokemonBDD.vecesbuscado
                            array.push(estructura)
                            setPokemon(poke)

                        })
                        .catch(errorEnLectura => { console.log("error de lectura", errorEnLectura) })
                        .finally(() => { console.log("Se resolvio la promesa") })

                })
                .catch(respuestaFallida => { console.log("Hubo un error", respuestaFallida) })

        })

        setArrayPokemones(array)

        array.forEach(element => {
            console.log("nombre actual en el array: " + element.name)
        });
        setBandera(true)

    };






    useEffect(() => {

    }, [pokemon, arrayPokemones.length]);

    return (

        <div>
            <div>
                <TextField type="number" id="outlined-basic" label="Cantidad a buscar" size="small" variant="outlined" onChange={(e) => setCantidad(e.target.value)} />
                <Button color="primary" variant="contained" size="medium" onClick={() => getMasBuscados()}>Buscar </Button>
            </div>

            <div className="tabla-MasBuscados">
                <table>

                    {
                        bandera &&
                        <tr><td><h2>Posición</h2></td><td><h2>Pokemon</h2></td><td><h2>Busquedas</h2></td></tr>
                    }
                    
                    {(bandera) ? (

                        arrayPokemones.map((poke, index) => {

                            console.log("pokemon actual: " + poke.pokemon.name)
                            return (
                                <tr>
                                    <td> <h2>{index + 1}.</h2></td> <td><Pokemon pokemon={poke.pokemon} /> </td> <td><h2>{poke.busquedas} </h2></td>
                                </tr>
                            );
                        })


                    ) : <div></div>
                    }
                </table>
            </div>


        </div>
    );
}


export default MasBuscados;