import { useContext } from "react"
import pokemonlogo from "../../../src/assets/pokemon-23.svg"
import { MdClear } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { PokemonContext } from "../../contextAPI/pokemonContextAPI";

export default function PokemonSearchBar({ handleSearch }) {

  const {
          searchTerm,
          setSearchTerm,
          showFilterOptions,
          setShowFilterOptions
      } = useContext(PokemonContext);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <section className="max-w-lg mx-auto my-6 md:my-4">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <p className="text-white text-2xl md:text-3xl">Search for a</p>
        <img className="w-30 md:w-40 h-auto" src={pokemonlogo} alt="Pokemon Logo" />
      </div>
      <div className="relative flex gap-4 flex-row items-center px-5 md:px-0">
        <button onClick={() => setShowFilterOptions(!showFilterOptions)} className="cursor-pointer text-white flex  items-center gap-2 text-lg"><FaFilter className="text-yellow-400 text-lg"/>Filter</button>
        <input
          autoFocus
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