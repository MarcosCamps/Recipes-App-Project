import React from 'react';
import PropTypes from 'prop-types';
import recipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const contextValue = {
  };

  return (
    <recipesContext.Provider value={ contextValue }>
      { children }
    </recipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
