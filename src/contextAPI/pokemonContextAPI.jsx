import { createContext, useState } from "react";

export const PokemonContext  = createContext();


export function PokemonContextProvider({children}){

    const [searchTerm, setSearchTerm] = useState("");
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [showFavPokemonIdArr,setShowFavPokemonIdArr] = useState(JSON.parse(localStorage.getItem('favoritePokemon')) || []);
    const [showFilterOptions,setShowFilterOptions] = useState(false);

    return(
        <PokemonContext.Provider 
        value={{
            searchTerm,
            setSearchTerm,
            pokemonList,
            setPokemonList,
            filteredPokemon,
            setFilteredPokemon,
            showFavPokemonIdArr,
            setShowFavPokemonIdArr,
            showFilterOptions,
            setShowFilterOptions
        }}>
             {children}
        </PokemonContext.Provider>
    )
}