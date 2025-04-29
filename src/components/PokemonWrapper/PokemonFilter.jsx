import { useState,useMemo } from "react";

export default function PokemonFilter({pokemonList,setFilteredPokemon}){

    const [selectedType, setSelectedType] = useState("");
      
      const uniqueTypes = useMemo(() => {
        const filterSet = new Set();
        pokemonList.map((pokemon) => (
          pokemon.types.map((pokemonType) => {
            console.log("doing mapping")
            filterSet.add(pokemonType.type.name)
          })
        ))
    
        return [...filterSet];
      },[pokemonList])

    const handleTypeChange = (event) => {
        console.log(event.target.value);
        setSelectedType(event.target.value);
        setFilteredPokemon(pokemonList.filter((pokemon) => {
          return pokemon.types.some((typeInfo) => typeInfo.type.name === event.target.value);
        }))
      }

      const clearFilter = () => {
        setSelectedType("");
        setFilteredPokemon(pokemonList);
      }

    return(
        <div className="flex ">
        <button
        className="bg-yellow-400 text-black px-4 py-3 me-2 rounded-lg hover:bg-yellow-300 font-semibold"
        onClick={clearFilter}
        disabled={selectedType === ""}
      >
        Clear
      </button>
        <select 
              name="pokemonType" 
              id="pokemonType" 
              className="bg-gray-800 text-yellow-400 rounded-lg py-3 ps-3 pe-5 mr-2 shadow-xl/20 shadow-yellow-400/50"
              value={selectedType}
              onChange={handleTypeChange}
              >
              <option value="" disabled>Select Type</option>
              {
                uniqueTypes.map((type) => (
                  <option key ={type} value={type}>{type}</option>
                ))
              }
            </select>
        </div>
    )
}