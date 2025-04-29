import pokemonBall from "../../assets/pokeball.png"

export default function LoadingBall({ballWidth}){
    return(
        <div className="flex justify-center items-center w-full my-10">
                    <img src={pokemonBall} alt="Loading Pokeball" className={`w-${ballWidth} animate-spin`} />
        </div>
    )
}