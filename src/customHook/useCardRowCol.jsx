import { useState,useEffect } from "react";


function useCardRowCol(){

    const [screenSize,setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize(){
            setScreenSize(window.innerWidth);
        }

        window.addEventListener("resize",handleResize);

        return () => {
            window.removeEventListener("resize",handleResize)
        }
    },[])

    return screenSize;
}

export default useCardRowCol;