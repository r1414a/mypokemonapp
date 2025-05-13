import pokemonlogo from "../../assets/pokemon-23.svg";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

import Drawer from '@mui/material/Drawer';
import { useState } from "react";
import FavoritesAsDrawerContent from "../FavoritesAsDrawerContent/FavoritesAsDrawerContent";


export default function NavBar() {

  const [openDrawer,setOpenDrawer] = useState(false);


  return (
    <header className="max-w-screen-2xl  mx-auto flex items-center p-4 md:p-6">
      <div className="basis-[70%] md:basis-1/2">
        <div className="basis-1/2 flex item-center text-white">
          <h1 className="my-auto text-2xl md:text-4xl">mY</h1>
          <img className="w-30 md:w-36" src={pokemonlogo} alt="" />
          <h1 className="my-auto text-2xl md:text-4xl">App</h1>
        </div>
        <p className="text-md md:text-lg text-white ">
          Explore the world of Pokemon!
        </p>
      </div>
      <div className="basis-[30%] md:basis-1/2 flex justify-end pe-4">
        

        <button className="cursor-pointer" onClick={() => setOpenDrawer(true)}> {openDrawer ? <FaHeart className='text-2xl md:text-3xl text-yellow-400'/> : <CiHeart className="text-2xl md:text-3xl text-white hover:text-yellow-400"/>}</button>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <FavoritesAsDrawerContent setOpenDrawer={setOpenDrawer}/>
      </Drawer>
      </div>
    </header>
  );
}
