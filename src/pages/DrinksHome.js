import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/RecipesContext';

const limit = 12;

function DrinksHome() {
  const {
    recipes,
    isSearching,
  } = useContext(recipesContext);

  return (
    <>
      <Header Title="Drinks" />
      <section>
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
