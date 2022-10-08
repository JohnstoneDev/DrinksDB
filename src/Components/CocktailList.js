import CocktailPage from "./CocktailPage";

// Receives props of the drinks, loading and a function that handles click events on the cocktailpage

function CocktailList( { drinks , loading , passClickFunction , buttonMessage }){

    return(
        <div className="grid grid-columns-2 box-content h-screen w-screen">
            <h3 className="py-3 px-3 text-xl">{loading ? "Loading Drinks ..." : "Cocktail Options :" }</h3>
            {drinks.map((cocktail) => {
                return <CocktailPage drink={cocktail} key={cocktail.idDrink} passClickFunction={passClickFunction} buttonMessage={buttonMessage}/>
            })}
        </div>
    )
}

export default CocktailList;
