import React from "react";
import { useState, useEffect } from 'react';
import { buscarPokemon } from "../PokeApi";
import { Button} from '@material-ui/core';
import Pokemon from './Pokemon';
import axios from 'axios';
import {getPokemones} from '../PokeApi';

const ReiniciarBDD = () => {
   
    const urlBDD = "https://localhost:5001/api/Pokemon/";
    const [cantidad, setCantidad]= useState(0);

    const cargarPokemones = (async () => {

        const dataa = await getPokemones(1,0);
        const cantidadPokemones = dataa.count;
        console.log("cantidad total de pokemones: "+cantidadPokemones)
        const data = await getPokemones(cantidadPokemones, 0);
        // console.log("data: "+data);
        
        //creo un arreglo de promesas donde voy a obtener la info de cada url de los pokemones
        var pokeBDD = {id: 0, nombre: "", vecesbuscado: 0, favorito: false};
        // console.log("basico: "+ pokeBDD)
        let cant=0
        const resetBdd = await axios.delete(urlBDD);
        // console.log("resultado del deletebdd: " +resetBdd)
        const promesas = await Promise.all(data.results.map(async (pokemon, index) => {
                console.log(pokemon.name);
                pokeBDD.id = index+1
                // console.log("id: "+index)

                pokeBDD.nombre = pokemon.name
                // console.log("xS:"+pokeBDD)
                const response = await axios.post(urlBDD, pokeBDD)
                const pokemonBDD = response.data
                // console.log("respuesta del post " +pokemonBDD)
                cant=index
            
  
        }))
        cant++
        //pauso la ejecucion hasta que se resulvan todas las promesas
        //const results = await Promise.all(promesas)
        setCantidad(cantidadPokemones)
        // console.log("cantidad: "+cant)
    })



    useEffect(() => {
        cargarPokemones();
      }, []);
    return (
        <h2>Se cargaron {cantidad} pokemones en la bdd</h2>
      
    )


}


export default ReiniciarBDD;