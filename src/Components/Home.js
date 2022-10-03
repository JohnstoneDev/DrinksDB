import { Route , Switch , Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import CocktailList from "./CocktailList";
import DrinkCollection from "./DrinkCollection";
import About from "./About";

// Url for fetching the drinks from cocktailsdb.com

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// Navigation component that houses all the links.

function Navigation(){
    return (
           <div className="py-4 px-4">
            <Link to="/" className="py-2 px-2 mx-2 border-b-4 hover:border-slate-900"> Home </Link>
            <Link to="/collection" className="py-2 px-2 mx-2 border-b-4 hover:border-slate-900"> Your Collection </Link>
            <Link to="/about" className="py-2 px-2 mx-2 border-b-4 hover:border-slate-900"> About </Link>
           </div>
    )
}

// Main component, all state is handled within the home and passed down as props to 
// every other component.

function Home(){
    const [ cocktails, setCocktails ] = useState([]);
    const [ collectedDrinks, setCollectedDrinks ] = useState([]);

    const [ loading, setLoading ] = useState(true);
    const [ modal , setModal ] = useState(true);
    const [ message, setMessage ] = useState("Add Successful");
    
    const [ letter, setLetter ] = useState("a");

    const letterRef = useRef(letter);

// usecallback hook that fetches the data, because the last letter changes I housed it here
// instead of directly within the useEffect hook.

    const fetchDrinks = useCallback(() => {
        fetch(`${url}${letter}`,{
            method : "GET",
        })
        .then(r => r.json())
        .then(d => {
            setTimeout(() => {
                if(d.drinks){
                    setLoading(false);
                    setCocktails(d.drinks);
                }
            },2000)
        })
        .catch(e => console.log(e)); 
    },[letter]);

// the useEffect calls fetchDrinks to display all the data and another async function that checks for 
// collected drinks in the database.

    useEffect(() => {
        fetchDrinks()
        fetch("https://frozen-falls-89676.herokuapp.com/drinks")
        .then(r => r.json())
        .then(d => setCollectedDrinks(d))
        .catch(e => console.log(e));

    },[fetchDrinks,letter]);

 
    function handleSubmit(e){
        e.preventDefault();
        const drinkName = letterRef.current.value;

        if(drinkName !=="") setLetter(drinkName); 

        fetchDrinks()
    }

    // Form that can be used to change the url to get the criteria for getting data from cocktailsDb API
   
    function SearchCriteria(){
        return (
            <form onSubmit={handleSubmit} className="py-3 px-3">
                <h4 hidden={modal}>{message}</h4>
                <input type="text" ref={letterRef} placeholder="enter drink name" className="border border-l-rounded px-l-2"/>
                <button onClick={handleSubmit} className="border-2 rounded-r-lg px-2 bg-slate-400 text-white hover:bg-slate-800 shadow-2xl">Get Drinks</button>
            </form>
        )
    }

 // Adds a drink item to the collection and posts it to the database. 

    function addDrinkToCollection(id){
        const drink = cocktails.find((item) => item.idDrink === id);

        const postDrink = {...drink,id:drink.idDrink}; 

        if(!collectedDrinks.find((item) => item.idDrink === drink.id)){
            fetch("https://frozen-falls-89676.herokuapp.com/drinks",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(postDrink)
            })
            .then(r => r.json())
            .then(d => {
                setCollectedDrinks((collectedDrinks) => [...collectedDrinks,d]);
            })
            .catch(err => console.log(err));
        } else { 
            setTimeout(() => {
                setModal(false);
                setMessage("Drink already in your collection!");
            },300)
            setModal(true)
        }

    }
    // Removes a cocktail from the collection component and deletes it from the database.

    function removeDrinkFromCollection(id){
        const drink = collectedDrinks.find((item) => item.idDrink === id);  

        fetch(`https://frozen-falls-89676.herokuapp.com/drinks/${drink.idDrink}`,{
            method  : "DELETE",
            headers : {'Content-Type' : "application/json"}
        })
        .then(r => r.json())
        .then(() => { setCollectedDrinks(collectedDrinks.filter(d => d.idDrink !== id))})
        .catch(e => console.log(e));
    }

    return (
        <div className="h-full w-full py-2 px-3">
          <Navigation/>
          <Switch>
            <Route path="/collection">
                <DrinkCollection drinks={collectedDrinks} passClickFunction={removeDrinkFromCollection} buttonMessage={"Delete This Drink"}/>
            </Route>

            <Route path="/about">
                <About />
            </Route>

            <Route path="/">
                <SearchCriteria />
                <CocktailList drinks={cocktails} loading={loading} passClickFunction={addDrinkToCollection} buttonMessage={"Add To Your Collection"}/>
            </Route>
          </Switch>
        </div>
    )
    
}

export default Home;