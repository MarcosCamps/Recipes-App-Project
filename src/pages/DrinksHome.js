/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/RecipesContext';
import { fetchSearchByName, fetchSearchByIngredient } from '../services/apiRequests';
import '../Styles/home.css';
import Categories from '../components/Categories';

const limit = 12;

function DrinksHome() {
  const {
    recipes,
    setRecipes,
    isSearching,
    setIsSearching,
    selectedIngredient,
    setSelectedIngredient,
  } = useContext(recipesContext);

  useEffect(() => {
    const recipesFetch = async () => {
      const response = await fetchSearchByName('', 'Drinks');
      setRecipes(response);
      setIsSearching(true);
    };
    const recipesFetchByIngredient = async (ingredient) => {
      const response = await fetchSearchByIngredient(ingredient, 'Drinks');
      setRecipes(response);
      setIsSearching(true);
      setSelectedIngredient('any');
    };
    if (selectedIngredient === 'any') recipesFetch();
    if (selectedIngredient !== 'any') recipesFetchByIngredient(selectedIngredient);
  }, []);

  return (
    <>
      <Header Title="Drinks" />
      <Categories Type="drinks" />
      <section className="recipes-container">
        { isSearching && recipes.drinks.slice(0, limit).map((recipe, index) => (
          <Link
            to={ `/drinks/${recipe.idDrink}` }
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          </Link>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default DrinksHome;
