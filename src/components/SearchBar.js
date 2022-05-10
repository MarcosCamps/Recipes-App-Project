/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  fetchSearchByIngredient,
  fetchSearchByName, fetchByFirstLetter,
} from '../services/apiRequests';
import recipesContext from '../context/RecipesContext';

function SearchBar({ Title }) {
  const {
    setRecipes,
    setIsSearching,
  } = useContext(recipesContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const history = useHistory();

  function foodDetailsPush(response) {
    const { meals } = response;
    if (meals.length === 1) {
      history.push(`/foods/${meals[0].idMeal}`);
    }
  }
  function drinkDetailsPush(response) {
    const { drinks } = response;
    if (drinks.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
    }
  }

  function oneMealOnly(response) {
    const type = Object.keys(response)[0];
    if (response[type]) {
      if (Object.keys(response)[0] === 'meals') {
        foodDetailsPush(response);
      }
      if (Object.keys(response)[0] === 'drinks') {
        drinkDetailsPush(response);
      }
    }
    if (response[type].length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }

  async function onSearchClick() {
    const mealType = Title === 'Foods' ? 'meals' : 'drinks';
    switch (searchType) {
    case 'ingredient': {
      const response = await fetchSearchByIngredient(searchInput, Title);
      if (response[mealType] === null) response[mealType] = [];
      oneMealOnly(response);
      setRecipes(response);
      setIsSearching(true);
      break;
    }
    case 'name': {
      const response = await fetchSearchByName(searchInput, Title);
      if (response[mealType] === null) response[mealType] = [];
      oneMealOnly(response);
      setRecipes(response);
      setIsSearching(true);
      break;
    }
    case 'first-letter': {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const response = await fetchByFirstLetter(searchInput, Title);
      if (response[mealType] === null) response[mealType] = [];
      oneMealOnly(response);
      setRecipes(response);
      setIsSearching(true);
      break;
    }
    default:
      break;
    }
  }

  return (
    <div>
      <section className="search-container">
        <div
          className="search-type-container"
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
        <input
          type="text"
          data-testid="search-input"
          value={ searchInput }
          onChange={ ({ target: { value } }) => setSearchInput(value) }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ onSearchClick }
        >
          Search
        </button>
      </section>
    </div>
  );
}

SearchBar.propTypes = {
  Title: PropTypes.string.isRequired,
};

export default SearchBar;
