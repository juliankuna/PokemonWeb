import React from 'react'
//los nombres que le de a mi context y a mi provider tiene que respetar letra capital para que funcione, sino no los toma
const FavoriteContext = React.createContext({
    pokemonesFavoritos: [],
    updateFavoritos: (id) => null
}); 
export const FavoriteProvider = FavoriteContext.Provider;

export default FavoriteContext;