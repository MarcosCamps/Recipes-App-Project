import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import recipesContext from '../context/RecipesContext';

const limit = 12;

function FoodHome() {
  const {
    recipes,
    isSearching,
  } = useContext(recipesContext);

  return (
    <>
      <Header Title="Foods" />
      <section>
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
