import PokemonSearchBar from "./PokemonSearchBar";
import ShowPokemonCards from "./ShowPokemonCards";

import { useState, useEffect, useContext } from "react";
import { PokemonContext } from "../../contextAPI/pokemonContextAPI";
import SortPokemon from "./SortPokemon";
import PokemonFilter from "./PokemonFilter";

export default function PokemonWrapper() {
  const {
    setSearchTerm,
    setPokemonList,
    setFilteredPokemon,
    showFilterOptions,
  } = useContext(PokemonContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  

  useEffect(() => {
    const fetchPokemonList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
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
      });

      const finalResult = await Promise.all(allPokemonPromises);
      setPokemonList(finalResult);
      setFilteredPokemon(finalResult);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      setError(`Error while fetching Pokémon: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
    fetchPokemonList();
  }, []);

  return (
    <>
      <PokemonSearchBar handleSearch={handleSearch} />
        {/* {showFilterOptions ? <PokemonFilter /> : null} */}
        <PokemonFilter /> 
      <div className="my-16 max-w-screen-2xl mx-auto px-5 md:px-10">

        <SortPokemon />
        <ShowPokemonCards loading={loading} error={error} />
      </div>
    </>
  );
}
