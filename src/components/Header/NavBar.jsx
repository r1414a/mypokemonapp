import pokemonlogo from "../../assets/pokemon-23.svg"

export default function NavBar(){
    return(
        <header className="p-4 md:p-6">
            <div className="flex item-center text-white">
                <h1 className="my-auto text-3xl md:text-4xl">mY</h1>
                <img className="w-32 md:w-36" src={pokemonlogo} alt="" />
                <h1 className="my-auto text-3xl md:text-4xl">App</h1>
            </div>
            <p className="text-md md:text-lg text-white ">Explore the world of Pokemon!</p>
        </header>
    )
}