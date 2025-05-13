import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";

import { useState,useContext } from "react";
import { PokemonContext } from "../../contextAPI/pokemonContextAPI";


export default function SortPokemon() {
  const {pokemonList,setPokemonList,filteredPokemon,
    setFilteredPokemon} = useContext(PokemonContext);
  // console.log([...filteredPokemon].sort((a, b) => a.height - b.height));
  const [sort, setSort] = useState({
    by: "id",
    order: "asc",
  });

  const handleSort = (sortby) => {
    console.log("name sort click", sortby);
    let sortedData = [...filteredPokemon];
    if (sortby !== "id") {
      setSort((prev) => ({
        by: sortby,
        order: prev.by === sortby && prev.order === "asc" ? "desc" : "asc",
      }));

      const isSameSortBy = sort.by === sortby;
      const nextOrder = isSameSortBy && sort.order === "asc" ? "desc" : "asc";

      if(sortby === "height"){
        sortedData.sort((a, b) =>
          nextOrder === "asc" ? a.height - b.height : b.height - a.height
        );
        }else if (sortby === "weight") {
          sortedData.sort((a, b) =>
            nextOrder === "asc" ? a.weight - b.weight : b.weight - a.weight
          );
        }else if (sortby === "name") {
          sortedData.sort((a,b) => 
            nextOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        )
        }
        setFilteredPokemon(sortedData);
        
      } else {
      sortedData = [...pokemonList]; 
      setSort({
        by: "id",
        order: "asc",
      });
      setFilteredPokemon(sortedData);
    }
  };

  return (
    <div className="flex  justify-end text-white mb-8 text-end space-x-4 md:space-x-6 text-md md:text-lg ">
      <button
        className="cursor-pointer hover:text-yellow-400"
        onClick={() => handleSort("id")}
      >
        id (default)
      </button>
      <button
        className={`${
          sort.by === "name" ? "text-yellow-400" : "text-white"
        } flex items-center gap-1 cursor-pointer hover:text-yellow-400`}
        onClick={() => handleSort("name")}
      >
        {sort.by === "name" ? (
          sort.order === "asc" ? (
            <FaSortAmountUp />
          ) : (
            <FaSortAmountDown />
          )
        ) : (
          <FaSortAmountUp />
        )}
        Name
      </button>
      <button
        className={`${
          sort.by === "height" ? "text-yellow-400" : "text-white"
        } flex items-center gap-1 cursor-pointer hover:text-yellow-400`}
        onClick={() => handleSort("height")}
      >
        {sort.by === "height" ? (
          sort.order === "asc" ? (
            <FaSortAmountUp />
          ) : (
            <FaSortAmountDown />
          )
        ) : (
          <FaSortAmountUp />
        )}
        Height
      </button>
      <button
        className={`${
          sort.by === "weight" ? "text-yellow-400" : "text-white"
        } flex items-center gap-1 cursor-pointer hover:text-yellow-400`}
        onClick={() => handleSort("weight")}
      >
        {sort.by === "weight" ? (
          sort.order === "asc" ? (
            <FaSortAmountUp />
          ) : (
            <FaSortAmountDown />
          )
        ) : (
          <FaSortAmountUp />
        )}
        Weight
      </button>
    </div>
  );
}
