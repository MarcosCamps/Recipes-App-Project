/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/RecipesContext';
import { fetchSearchByName } from '../services/apiRequests';
import '../Styles/home.css';

const limit = 12;

function DrinksHome() {
  const {
    recipes,
    setRecipes,
    isSearching,
    setIsSearching,
  } = useContext(recipesContext);

  useEffect(() => {
    const recipesFetch = async () => {
      const response = await fetchSearchByName('', 'Drinks');
      setRecipes(response);
      setIsSearching(true);
    };
    recipesFetch();
  }, []);

  return (
    <>
      <Header Title="Drinks" />
      <section className="recipes-container">
        { isSearching && recipes.drinks.slice(0, limit).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default DrinksHome;
