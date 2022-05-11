import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../Styles/Header.css';

function Header({ Title }) {
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const history = useHistory();

  const changeRoute = () => {
    history.push('/profile');
  };

  return (
    <>
      <div className="header-container">
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
        <h2 data-testid="page-title">{Title}</h2>
        {Title === 'Foods' || Title === 'Drinks' || Title === 'Explore Nationalities' ? (
          <button
            type="button"
            onClick={ () => setIsSearchDisabled(!isSearchDisabled) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Search Icon"
            />
          </button>
        ) : ''}
      </div>
      { !isSearchDisabled && <SearchBar Title={ Title } /> }
    </>
  );
}

Header.propTypes = {
  Title: PropTypes.string.isRequired,
};

export default Header;
