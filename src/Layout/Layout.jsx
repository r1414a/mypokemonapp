import { Outlet } from "react-router";
import NavBar from "../components/Header/NavBar";
import { PokemonContextProvider } from "../contextAPI/pokemonContextAPI";



export default function Layout() {
    return (
        <>
            <PokemonContextProvider>
            <NavBar />
                <Outlet />
            </PokemonContextProvider>
        </>
    )
}