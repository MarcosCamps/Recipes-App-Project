/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  fetchSearchByIngredient,
  fetchSearchByName, fetchByFirstLetter,
} from '../services/apiRequests';
import recipesContext from '../context/RecipesContext';

function SearchBar({ Title }) {
  const {
    recipes,
    setRecipes,
    setIsSearching,
  } = useContext(recipesContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  /* const [isSearchingDrink, setIsSearchingDrink] = useState(false);
  const [isSearchingFood, setIsSearchingFood] = useState(false); */
  const history = useHistory();

  function foodDetailsPush() {
    const { meals } = recipes;
    console.log(recipes);
    console.log(meals);
    if (meals.length === 1) {
      history.push(`/foods/${meals[0].idMeal}`);
    }
  }
  function drinkDetailsPush() {
    const { drinks } = recipes;
    console.log(recipes);
    console.log(drinks);
    if (drinks.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
    }
  }

  function showRecipesList() {
    const type = Object.keys(recipes)[0];
    if (recipes[type]) {
      if (Object.keys(recipes)[0] === 'meals') {
        foodDetailsPush();
      }
      if (Object.keys(recipes)[0] === 'drinks') {
        drinkDetailsPush();
      }
    }
    if (!recipes[type]) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setRecipes({ [type]: [] });
    }
  }

  async function onSearchClick() {
    switch (searchType) {
    case 'ingredient': {
      const response = await fetchSearchByIngredient(searchInput, Title);
      setRecipes(response);
      setIsSearching(true);
      break;
    }
    case 'name': {
      const response = await fetchSearchByName(searchInput, Title);
      setRecipes(response);
      setIsSearching(true);
      break;
    }
    case 'first-letter': {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const response = await fetchByFirstLetter(searchInput, Title);
      setRecipes(response);
      setIsSearching(true);
      break;
    }
    default:
      break;
    }
  }

  useEffect(() => {
    showRecipesList();
  }, [recipes]);

  return (
    <div>
      <section className="search-container">
        <input
          type="text"
          data-testid="search-input"
          value={ searchInput }
          onChange={ ({ target: { value } }) => setSearchInput(value) }
        />
        <div
          name="search-type"
          value={ searchType }
          onChange={ ({ target: { value } }) => setSearchType(value) }
        >
          <label htmlFor="ingredient-search">
            Ingrediente
            <input
              type="radio"
              name="search-type"
              id="ingredient-search"
              data-testid="ingredient-search-radio"
              value="ingredient"
            />
          </label>
          <label htmlFor="name-search">
            Nome
            <input
              type="radio"
              name="search-type"
              id="name-search"
              data-testid="name-search-radio"
              value="name"
            />
          </label>
          <label htmlFor="first-letter-search">
            Primeira Letra
            <input
              type="radio"
              name="search-type"
              id="first-letter-search"
              data-testid="first-letter-search-radio"
              value="first-letter"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ onSearchClick }
        >
          Search
        </button>
      </section>
      {/* <section>
        { isSearchingDrink && recipes.drinks.slice(0, limit).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          </div>
        ))}
        { isSearchingFood && recipes.meals.slice(0, limit).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          </div>
        ))}
      </section> */}
    </div>
  );
}

SearchBar.propTypes = {
  Title: PropTypes.string.isRequired,
};

export default SearchBar;
