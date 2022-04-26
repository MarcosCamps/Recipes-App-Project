import React, { useState } from 'react';
import { fetchSearchByIngredient,
  fetchSearchByName, fetchByFirstLetter } from '../services/apiRequests';

function Header({ Title }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');

  function onSearchClick() {
    switch (searchType) {
    case 'ingredient':
      return fetchSearchByIngredient(searchInput, Title);
    case 'name':
      return fetchSearchByName(searchInput, Title);
    case 'first-letter':
      return fetchByFirstLetter(searchInput, Title);
    default:
      break;
    }
  }

  return (
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
  );
}

export default Header;
