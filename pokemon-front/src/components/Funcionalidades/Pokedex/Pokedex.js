import React from 'react';
import '../../../App.css';
import Pokemon from '../../Pokemon/Pokemon';
import Pagination from './Pagination';
import images from "../../../images/images";

const Pokedex = (props) => {
    
    const {pokemones, page, setPage, total, loading} = props;
    
    const lastPage = () => {
        const nextPage = Math.max(page - 1,0)
        setPage(nextPage)
    }

    const nextPage = () =>{
        const nextPage = Math.min(page + 1,total)
        setPage(nextPage)
    }

    return (
        <div>
                <div className="header">
                    <h1>Pokedex:</h1>
                    <Pagination
                    page={page+1}
                    totalPages={total}
                    onLeftCLick={lastPage}
                    onRightCLick={nextPage}
                    />    
                </div>

                {loading? (<div><img src={images.img3} className="pikachu-run" /><div>Cargando pokemones...</div></div>) :

             
                <div className="pokedex-grid">
                   {pokemones.map( (pokemon, indice) => {
                       return (
                           <Pokemon pokemon={pokemon} key={pokemon.name}/>
                       )
                   })}
                </div>
                   }
                  
        </div>
       
    );
};

export default Pokedex;