import React, { useState } from 'react';
import { fetchSearchByIngredient,
  fetchSearchByName, fetchByFirstLetter } from '../services/apiRequests';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ Title }) {
  const history = useHistory();

  const changeRoute = () => {
    history.push('/profile');
  };


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
      <div>
      <button
        type="button"
        onClick={ changeRoute }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
      <h2 data-testid="page-title">{ Title }</h2>
      { Title === 'Foods' || Title === 'Drinks' || Title === 'Explore Nationalities' ? (
        <button
          type="button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search Icon"
          />
        </button>
      ) : ''}
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
   </div>
  );
}

Header.propTypes = {
  Title: PropTypes.string.isRequired,
};

export default Header;
