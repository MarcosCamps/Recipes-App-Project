import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import FoodHome from './pages/FoodHome';
import DrinkHome from './pages/DrinksHome';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodProgress from './pages/FoodProgress';
import DrinkProgress from './pages/DrinkProgress';
import Explore from './pages/Explore';
import FoodExplore from './pages/FoodExplore';
import DrinkExplore from './pages/DrinkExplore';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredient';
import ExploreDrinkByIngredients from './pages/ExploreDrinkByIngredient';
import ExploreFoodByNationality from './pages/ExploreFoodByNacionality';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ FoodHome } />
        <Route exact path="/drinks" component={ DrinkHome } />
        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route exact path="/foods/:id/in-progress" component={ FoodProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ FoodExplore } />
        <Route exact path="/explore/drinks" component={ DrinkExplore } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodByIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinkByIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodByNationality }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>

    </RecipesProvider>
  );
}

export default App;
