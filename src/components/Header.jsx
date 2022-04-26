import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ Title }) {
  const history = useHistory();

  const changeRoute = () => {
    history.push('/profile');
  };

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
    </div>
  );
}

Header.propTypes = {
  Title: PropTypes.string.isRequired,
};

export default Header;
