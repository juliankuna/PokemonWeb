import React from "react";
import { useState } from 'react';
import { buscarPokemon } from "../PokeApi";
import {TextField, Button} from '@material-ui/core';
import Pokemon from './Pokemon';
import DetallePokemon from "./DetallePokemon";
import axios from 'axios';

import images from "../images/images";

const Buscador = () => {
    const [buscar, setBuscar] = useState('');
    const [pokemon, setPokemon] = useState();
    const urlBDD = "http://localhost:5000/api/Pokemon/";
    const cambiosEnElTexto = ((nombrePokemon) => {
        console.log(nombrePokemon)
        setBuscar(nombrePokemon)
    });

    const clickBuscar = (async (pokemon) => {
        //console.log("Apreto el boton buscar")
        //pasamos a minuscula el texto ingresado en el bloc de notas y procedemos a buscar en la api
        try{
            if (buscar !== ""){
                const data = await buscarPokemon(buscar.toLocaleLowerCase());
                console.log(data);
                setPokemon(data);
                await contarBusqueda(data);
            }else{
                console.log("No puede ingresar campos vacios")

            }
            
        }catch (e){
            console.log("error: "+e)
        }
        
       // verTiposPokemon(data.types, setTipos);
    });

  
    const contarBusqueda = (async (pokemon) => {
        try{
            //BUSCAMOS EL POKEMON EN LA BASE DE DATOS
            const response = await axios.get(urlBDD+pokemon.id)
            const pokemonBDD = response.data
            console.log("pokemonBDD :" + pokemonBDD.nombre)
            //AUMENTAMOS EN UNO EL NUMERO DE VECES QUE FUE BUSCADO EN EL BACKEND
           

            //ACTUALIZAMOS EL POKEMON EN LA BDD para que figure el numero actualizado de busquedas
            await axios.put(urlBDD, pokemonBDD )
            .then(response =>{
                
                var respuesta = response.data
                console.log("veces buscado:" + respuesta.vecesbuscado)
               // var dataAuxiliar = data;
                //respuesta.vecesbuscado ++
              //  console.log("respuesta:" + respuesta.vecesbuscado)
            })
            .catch(error => console.log(error))
        }catch (error) {}
    })

 

 




    return (
        <div className="Buscador">
            <img  src={images.img2}

            alt="pokemon-logo"
            className="pikachu-caminando"
            />
            <div>
                 <TextField id="outlined-basic" label="Buscar pokemon..." variant="outlined" size= "small" onChange={(campoTexto) => cambiosEnElTexto(campoTexto.target.value)}/>
                 <Button color="primary" variant="contained" size="medium" onClick={clickBuscar}>Buscar </Button>
            </div>
            
                    
            <div>
                {pokemon &&
                    <div>
                        <div>
                            <Pokemon pokemon={pokemon} />
                        </div>
                        
                        <div>
                            <DetallePokemon pokemon={pokemon} />
                        </div>
                    </div>
               
                }
            </div>
        
        </div>
           
       


    );
}


export default Buscador;