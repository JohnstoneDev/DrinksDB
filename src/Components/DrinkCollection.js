// Receives props from Home component and handles their display.
// Rendering the coktails collected from the Database

import { useEffect } from "react";
import CocktailPage from "./CocktailPage"


function DrinkCollection( { drinks, passClickFunction, buttonMessage  }){
    useEffect(() => {
        console.log("component should re-render if collected drinks array changes");
    },[drinks]);

    return(
        <div className="h-screen w-screen bg-slate-100">
            {drinks.length <= 0 ? <h1> You Have No Drinks Pal!</h1>:<h1>These drinks are in your collection : </h1>}
            {drinks.map(drink => <CocktailPage key={drink.idDrink} drink={drink} passClickFunction={passClickFunction} buttonMessage={buttonMessage} /> )}
        </div>
    )
}

export default DrinkCollection;