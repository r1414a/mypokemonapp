import { useState, useEffect, useContext,useMemo } from "react";
import LoadingBall from "../Loadingball/LoadingBall";
import { PokemonContext } from "../../contextAPI/pokemonContextAPI";
import SinglePokemonCard from "./SinglePokemonCard";
import TablePagination from "@mui/material/TablePagination";
import useCardRowCol from "../../customHook/useCardRowCol";

export default function ShowPokemonCards({ loading }) {
  const screenWidth = useCardRowCol();
  const { searchTerm, pokemonList,filteredPokemon,setFilteredPokemon} =
    useContext(PokemonContext);
  const [page, setPage] = useState(0);
  const initialPokemonsPerPage = getRowsPerPageOptions(screenWidth)[0];
  const [pokemonsPerPage, setPokemonsPerPage] = useState(initialPokemonsPerPage);
  const intitialPokemonPerPageDropdown = getRowsPerPageOptions(screenWidth);
  const [pokemonPerPageDropdown,setPokemonPerPageDropdown] = useState(intitialPokemonPerPageDropdown)
  const startIndex = page * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;


  useEffect(() => {
  const newOptions = getRowsPerPageOptions(screenWidth);
  setPokemonPerPageDropdown(newOptions);

  if (!newOptions.includes(pokemonsPerPage)) {
    setPokemonsPerPage(newOptions[0]);
  }
}, [screenWidth]);


useEffect(() => {
        const filteredPokemonBySearchTerm = pokemonList.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredPokemon(filteredPokemonBySearchTerm);
},[searchTerm,pokemonList])


  if (loading) {
    return <LoadingBall ballWidth={36} />;
  }

  if (filteredPokemon.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <img
          src="https://c.tenor.com/lmA7VALYIAsAAAAd/tenor.gif"
          alt=""
          className="w-44 h-44 mb-5 rounded-full shadow-md shadow-yellow-400"
        />
        <p className="text-yellow-400 text-2xl font-bold">No Pokémon Found</p>
      </div>
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPokemonsPerPage(parseInt(event.target.value));
    setPage(0);
  };
 

  function getRowsPerPageOptions(width){
     if (width >= 1280) {
      return [30,60,90]; // 5→30 //5, 10→60 //3, 15→90 //2
    } else if (width >= 1024) {
      return [25,50,75]; // 5→25 //6, 10→50 //3, 15→75 //2
    } else if (width >= 768) {
      return [20,40,60]; // 5→20 //8, 10→40 //4, 15→60 //3
    } else if (width >= 640) {
      return [15,30,45]; // 5→15 //10, 10→30 //5, 15→45 //4
    } else {
      return [10,20,30]; // 5→10 //15, 10→20 //8, 15→30 //5
    }
  }


 console.log(page,pokemonsPerPage);

  return (
    <>
      <section
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  mx-auto gap-4 md:gap-6`}
      >
        {filteredPokemon.slice(startIndex,endIndex).map((pokemonDetails) => (
          <SinglePokemonCard
            key={pokemonDetails.id}
            pokemonDetails={pokemonDetails}
          />
        ))}
      </section>
      <div className="my-10 flex justify-center text-white text-2xl">
        <TablePagination
          sx={{
            "&.MuiTableCell-root": {
              border: "none",
            },
            ".MuiTablePagination-selectLabel": {
              color: "white",
            },
            ".MuiSvgIcon-root": {
              color: "white",
            },
            ".Mui-disabled .MuiSvgIcon-root": {
              color: "#ffffff61",
            },
            ".MuiSelect-select": {
              color: "white",
            },
            ".MuiTablePagination-displayedRows": {
              color: "white",
            },
          }}

          component="div"
          count={filteredPokemon.length}
          page={page}
          labelRowsPerPage={"Pokémon's per page:"}
          rowsPerPageOptions={pokemonPerPageDropdown}
          onPageChange={handleChangePage}
          rowsPerPage={pokemonsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
