import React from 'react';
import './App.css';
import Buscador from './components/Buscador';
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import { useState, useEffect } from 'react';
import { getPokemones, getPokemonInfo } from "./PokeApi";
import SingUp from './components/SingUp';
import SingIn from './components/SingIn';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
//import {MenuIcon} from '@material-ui/icons/Menu';
//import {Typography} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button, ButtonGroup, Container } from '@material-ui/core';
import { FavoriteProvider } from './contexts/FavoriteContexts';
import PokeFavs from './components/PokeFavs';
import ReiniciarBDD from './components/ReiniciarBDD';
import BuscarPorTipo from './components/BuscarPorTipo';
import MasBuscados from './components/MasBuscados';
import Footer from './components/Footer';

function App() {
  // para texto interpolado agregar ```````````````````````````````````````````````````````````` 

  const [pokemones, setPokemones] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

  const localStorageKey= "pokemones-favoritos"

  const cargarPokemones = async () => {
    try {
      setLoading(true)
      const cantidad =30
      const data = await getPokemones(cantidad, cantidad * page);
      //creo un arreglo de promesas donde voy a obtener la info de cada url de los pokemones
      // asi puedo mostrar la imagen
      const promesas = data.results.map(async (pokemon) => {
        return await getPokemonInfo(pokemon.url)


      })
      //pauso la ejecucion hasta que se resulvan todas las promesas
      const results = await Promise.all(promesas)
      setPokemones(results)
      setLoading(false)
      setTotal(Math.ceil(data.count / cantidad))
    } catch (e) { }
  }
  useEffect(() => {
    console.log("Obteniendo todos los pokemones")
    cargarPokemones();

  }, [page]);


  const loadFavoritePokemons = () => {
    const pokefavs =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavoritos(pokefavs);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);


  const updatePokemonesFavoritos = (name) => {
    console.log("1.pokemon elegido: "+name)
    const updated = [...favoritos]
    const isFavorite = updated.indexOf(name)
    if (isFavorite>=0){
      updated.splice(isFavorite, 1)
    }else{
      updated.push(name)
    }
     setFavoritos(updated);
     window.localStorage.setItem(localStorageKey, JSON.stringify(updated));


  }

  return (
    <FavoriteProvider value={{pokemonesFavoritos: favoritos, updateFavoritos: updatePokemonesFavoritos}}>

      <div className="body">
     
        <div>
          <AppBar position="static" className="encabezado">
            <Toolbar>

              <Navbar />

            </Toolbar>
          </AppBar>

        </div>

        <div className="App">
          <Container className="container">
            <Router>
              <div className="botonera">
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                  <Button component={Link} to="/SingIn" >Login</Button>
                  <Button component={Link} to="/ReiniciarBDD" >Reiniciar BDD</Button>
                  <Button component={Link} to="/" >Buscador</Button>
                  <Button component={Link} to="/BuscarPorTipo" >Buscar por tipo</Button>
                  <Button component={Link} to="/Pokedex" >Pokedex</Button>
                  <Button component={Link} to="/PokeFavs" >Favoritos</Button>
                  <Button component={Link} to="/MasBuscados" >Mas Buscados</Button>
                </ButtonGroup>
              </div>

              <Switch>
              <Route path="/SingIn" >
                  <hr></hr>
                  <SingIn />
                </Route>

              <Route path="/ReiniciarBDD" >
                  <hr></hr>
                  <ReiniciarBDD />
                </Route>

                <Route path="/" exact>
                  <hr></hr>

                  <Buscador />

                </Route>
               

                <Route path="/BuscarPorTipo" >
                  <hr></hr>
                  <BuscarPorTipo />
                </Route>

                <Route path="/Pokedex" >
                  <hr></hr>

                  <Pokedex pokemones={pokemones} page={page} setPage={setPage} total={total} loading={loading} />

                </Route>
                <Route path="/PokeFavs" >
                  <hr></hr>
                  <PokeFavs />
                </Route>

                <Route path="/MasBuscados" >
                  <hr></hr>
                  <MasBuscados />
                </Route>

              </Switch>
            </Router>

          </Container>

        </div>

    </div>
    <div className="Footer">
    
    </div>

    </FavoriteProvider>


  );


}
export default App;