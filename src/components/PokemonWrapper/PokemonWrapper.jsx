import PokemonSearchBar from "./PokemonSearchBar"
import ShowPokemonCards from "./ShowPokemonCards"

import { useState,useEffect } from "react"


export default function PokemonWrapper(){

    const [searchTerm, setSearchTerm] = useState("");
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleSearch = (event) => {
        console.log(event.target.value);
        setSearchTerm(event.target.value);
    }


    const fetchPokemonList = async () => {
            setLoading(true);
            setError(null)
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
                if (!response.ok) {
                    throw new Error("Failed to fetch Pokémon list");
                }
                const data = await response.json();
                // console.log(data);
                const allPokemonPromises = data.results.map(async (eachpokemonurl) => {
                   
                    const res = await fetch(eachpokemonurl.url);
                    if (!res.ok) {
                        throw new Error("Failed to fetch Pokémon details");
                      }
                    return res.json();
                })
    
                const finalResult = await Promise.all(allPokemonPromises);
                setPokemonList(finalResult);
                setFilteredPokemon(finalResult);
    
            } catch (error) {
                console.error("Error fetching Pokemon list:", error);
                setError(`Error while fetching Pokémon: ${error.message}`);
            }
            finally{
                setLoading(false);
            }
        }
    
        useEffect(() => {
            fetchPokemonList();
        }, []);

    return(
        <>
            <PokemonSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            pokemonList={pokemonList}
            setFilteredPokemon={setFilteredPokemon}
            />
            <div className="my-20 w-full px-5 md:px-10">
                <ShowPokemonCards 
                    searchTerm={searchTerm}
                    pokemonList={pokemonList}
                    loading={loading}
                    error={error}
                    filteredPokemon={filteredPokemon}
                    setFilteredPokemon={setFilteredPokemon}
                />
            </div>
        </>
    )
}