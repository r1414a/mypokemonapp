import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import LoadingBall from "../Loadingball/LoadingBall";
import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../contextAPI/pokemonContextAPI";



export default function SinglePokemonCard({
  pokemonDetails,
  // imgLoaded,
  // setImgLoaded,
}) {

  const {showFavPokemonIdArr,
    setShowFavPokemonIdArr} = useContext(PokemonContext);

  const handleAddFav = (id) => {
    // setClickedHeart(true);
    console.log(id);
    let favIdArr = JSON.parse(localStorage.getItem('favoritePokemon')) || [];

    if(!favIdArr.includes(id)){
      favIdArr = [...favIdArr,id];

    localStorage.setItem('favoritePokemon', JSON.stringify(favIdArr));
    setShowFavPokemonIdArr(favIdArr);
    }else{
      favIdArr = favIdArr.filter((items) => items != id);
      localStorage.setItem('favoritePokemon', JSON.stringify(favIdArr));
      setShowFavPokemonIdArr(favIdArr);

    }
  };


  return (
    <div
      className="relative bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center shadow-xl/20 shadow-yellow-400/50"
    >
      {/* {!imgLoaded && <LoadingBall ballWidth={32} />} */}
      <img
        // onLoad={() => setImgLoaded(true)}
        src={pokemonDetails.sprites.other.dream_world.front_default}
        alt={pokemonDetails.name}
        className="w-36 h-36"
      />
      <h2 className="text-white text-lg capitalize mt-2">
        {pokemonDetails.name}
      </h2>
      <p className="absolute top-1 left-3 text-yellow-400 text-sm">
        ID: #{pokemonDetails.id}
      </p>
      <button
        className="absolute top-2 right-3 cursor-pointer flex justify-center items-center"
        onClick={() => handleAddFav(pokemonDetails.id)}
      >
        {
            showFavPokemonIdArr.length === 0 || !showFavPokemonIdArr.includes(pokemonDetails.id)
            ?
            <CiHeart className="text-2xl text-white " />
            :
            <FaHeart className="text-xl text-yellow-400"/>

        }
      </button>
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {pokemonDetails.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs"
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
