# A Drinks database site 

## This is a project that uses React as the frontend and a fake database on heroku created with json-server deployed on Heroku.

## After the page loads a list of drinks are displayed with their pictures, the ingredients to make them and the preferred method for their service. 

## Users can then search for a drink from popular cocktails(vodka,margaritas...) either by typing in the first letter to the input box on the page. The pagee will then load the drinks available according to owhat is typed in. 

## Each drink has an option to "Add the drink to your collection" which will place the drink item in another page linked on top of the page which will display the drinks the user has collected. 

## On the collections page, the user has the option to delete a drink from their collection which will remove it from their database and the list of collected items.

## Since it is a Single-Page-Application React-Router V5 hadnles the client side Routing. 

## To see the project in action you can visit ["https://drinks-db.vercel.app/"] or clone this repo and run it locally, with the exception that to set up your local database run `npm run server` to start json-server which will act as your API & change the collected drinks url to use ['localhost:3000'].

## The coktails are fetched from the Cocktails-db API here ["https://www.thecocktaildb.com/api.php']

## The post and delete methods will make requests to the database on heroku.

## The styling on the project is done with Tailwind css ["https://tailwindcss.com/"]