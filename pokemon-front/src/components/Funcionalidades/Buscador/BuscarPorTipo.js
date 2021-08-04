import React from "react";
import { useState } from 'react';
import { buscarPokemon } from "../../../PokeApi";
import {TextField, Button} from '@material-ui/core';
import Pokemon from '../../Pokemon/Pokemon';
import DetallePokemon from "../../Pokemon/DetallePokemon";
import axios from 'axios';




const BuscadorPorTipo = () => {
    const [buscar, setBuscar] = useState('');
    const [pokemon, setPokemon] = useState();
    const urlParcial = "https://pokeapi.co/api/v2/type/";
    const cantidadTipos = 18;
    const contarTipos = (urlParcial) => {
        axios(urlParcial)
        .then(respuesta => {
                     
            
           respuesta.data.results.forEach(tipo => {
               
           });
        })
    }
    
    return(
        <div>

        </div>
    );
}

export default BuscadorPorTipo;
