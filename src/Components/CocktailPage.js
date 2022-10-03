// Displays each drink item passed in as props from the cocktail page and displays them.

function CocktailPage({ drink ,passClickFunction, buttonMessage }){
    const { idDrink,
            strDrink , 
            strInstructions ,
            strCategory, 
            strAlchoholic,
            strGlass, 
            strDrinkThumb,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strMeasure1
        } = drink ; 

    return (
        <div className="py-3 px-3 bg-slate-100">
            <section className="px-4 py-4">
                <div className="flex flex-row gap-5 align-middle">
                    <img src={strDrinkThumb} alt={strDrink} className="object-cover h-86 w-96 shadow-2xl"></img>
                    <article className="text-left px-4 py-4">
                        <h3>Drink Name : {strDrink}</h3>
                        <h3>Ingredients : {strIngredient1}, {strIngredient2}, {strIngredient3}, {strIngredient4}</h3>
                        <h3>Measure :{strMeasure1}</h3>
                        <h3>{strAlchoholic}</h3>
                        <h3>Category : {strCategory}</h3>
                        <h3>Drink : In {strGlass}</h3>
                        <p>Preparation : {strInstructions}</p>
                        <button className="bg-slate-400 text-slate-200 py-1 px-1 border-2 rounded-lg hover:bg-slate-800 shadow-2xl"
                        onClick={() => passClickFunction(idDrink)}>
                            {buttonMessage}
                        </button>
                    </article>
                </div>
            </section>
        </div>
    )
}
export default CocktailPage; 