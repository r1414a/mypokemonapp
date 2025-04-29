import { useState, useEffect } from "react"
import LoadingBall from "../Loadingball/LoadingBall"

export default function ShowPokemonCards({searchTerm,pokemonList,filteredPokemon,setFilteredPokemon,loading,error}) {
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        const filteredPokemon = pokemonList.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredPokemon(filteredPokemon);
    },[searchTerm,pokemonList])


    if (loading) {
        return (
          <LoadingBall ballWidth={36}/>
        );
      }
    
      if (error) {
        return (
          <div className="flex flex-col items-center justify-center my-10">
            <p className="text-red-400 text-2xl font-bold">{error}</p>
          </div>
        );
      }
    
      if (!loading && filteredPokemon.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center my-10">
            <img src="https://c.tenor.com/lmA7VALYIAsAAAAd/tenor.gif" alt="" className="w-44 h-44 mb-5 rounded-full shadow-md shadow-yellow-400"/>
            <p className="text-yellow-400 text-2xl font-bold">No Pokémon Found</p>
          </div>
        );
      }

    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 mx-auto gap-4 md:gap-6">
            {
                filteredPokemon.map((pokemonDetails) => (
                    <div key={pokemonDetails.id} className="relative bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center shadow-xl/20 shadow-yellow-400/50">
                        {
                            !imgLoaded && 
                            <LoadingBall ballWidth={32}/>
                        }
                        <img onLoad={() => setImgLoaded(true)} src={pokemonDetails.sprites.other.dream_world.front_default} alt={pokemonDetails.name} className="w-36 h-36" />
                        <h2 className="text-white text-lg capitalize mt-2">{pokemonDetails.name}</h2>
                        <p className="absolute top-1 left-3 text-yellow-400 text-sm">ID: #{pokemonDetails.id}</p>
                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                            {pokemonDetails.types.map((typeInfo) => (
                                <span key={typeInfo.type.name} className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs">
                                    {typeInfo.type.name}
                                </span>
                            ))}
                        </div>
                    </div>

                ))
            }
        </section>
    )
}