/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import recipesContext from '../context/RecipesContext';
import { fetchSearchByName } from '../services/apiRequests';
import '../Styles/home.css';

const limit = 12;

function FoodHome() {
  const {
    recipes,
    setRecipes,
    isSearching,
    setIsSearching,
  } = useContext(recipesContext);

  useEffect(() => {
    const recipesFetch = async () => {
      const response = await fetchSearchByName('', 'Foods');
      setRecipes(response);
      setIsSearching(true);
    };
    recipesFetch();
  }, []);

  return (
    <>
      <Header Title="Foods" />
      <section className="recipes-container">
        { isSearching && recipes.meals.slice(0, limit).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default FoodHome;
