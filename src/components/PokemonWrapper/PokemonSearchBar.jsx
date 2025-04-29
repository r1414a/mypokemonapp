import { useEffect, useState, useRef, useMemo } from "react"
import pokemonlogo from "../../../src/assets/pokemon-23.svg"
import { MdClear } from "react-icons/md";
import PokemonFilter from "./PokemonFilter";

export default function PokemonSearchBar({ searchTerm, setSearchTerm, handleSearch, pokemonList, setFilteredPokemon }) {
  const searchBarRef = useRef(null);

  const clearSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, []);

  return (
    <section className="max-w-lg mx-auto my-6 md:my-4">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <p className="text-white text-2xl md:text-3xl">Search for a</p>
        <img className="w-32 md:w-40 h-auto" src={pokemonlogo} alt="Pokemon Logo" />
      </div>
      <div className="relative flex flex-col gap-4 md:gap-0 md:flex-row items-center px-5 md:px-0">
        <PokemonFilter
          pokemonList={pokemonList}
          setFilteredPokemon={setFilteredPokemon}
        />
        <input
          ref={searchBarRef}
          type="search"
          name="pokemonSearchBar"
          id="pokemonSearchBar"
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
          placeholder="Enter Pokémon name..."
          className="basis-full md:basis-auto w-full p-3 rounded-lg bg-gray-800 text-yellow-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-xl/20 shadow-yellow-400/50"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300"
          >
            <MdClear className="font-bold" />
          </button>
        )}
      </div>
    </section>

  )
}