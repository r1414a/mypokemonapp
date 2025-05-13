import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { PokemonContext } from "../../contextAPI/pokemonContextAPI";
import SinglePokemonCard from "../PokemonWrapper/SinglePokemonCard";

export default function FavoritesAsDrawerContent({ setOpenDrawer }) {
  const { pokemonList,showFavPokemonIdArr } = useContext(PokemonContext);

  const [showFavPokemonDetails,setShowFavPokemonDetails] = useState([]);

  useEffect(() => {
      const allFavInArray = showFavPokemonIdArr.map((id) => {
        return pokemonList.find((pokemon) => pokemon.id === id)
        
      })
      setShowFavPokemonDetails(allFavInArray);
      
  },[showFavPokemonIdArr]);


  return (
    <Box
      sx={{ width: "90vw", position: "relative" }}
      role="presentation"
    >
      <button
        id="favoriteDrawerCloseButton"
        className="absolute right-6 top-6 md:right-12 md:top-8"
        onClick={() => setOpenDrawer(false)}
      >
        <GrClose className="text-2xl md:text-3xl z-10" />
      </button>
      <section className=" m-auto text-center max-w-4xl my-30 px-6 lg:px-0">
        {
          showFavPokemonDetails.length === 0
          ?
          (
            <div className="">
          <h1 className="text-3xl md:text-4xl font-semibold mb-10">
            Collect and view your favorite patterns.
          </h1>
          <p className="mx-auto text-lg md:text-xl text-center max-w-2xl">Tap the heart on any pokemon card to make it as a favorite. All your favorite pokemon will appear here.</p>
          </div>
          )
          :
          <h1 className="text-3xl md:text-4xl font-semibold mb-10">
            Your Favorite Pokémon's
          </h1>
        }
        <div className="grid justify-center grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {
          showFavPokemonDetails.map((pokemonDetails) => (
            <SinglePokemonCard
              key={pokemonDetails.id}
              pokemonDetails={pokemonDetails}
            />
          ))
          }
        </div>
      </section>
    </Box>
  );
}
