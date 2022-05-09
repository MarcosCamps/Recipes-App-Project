import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('any');
  const [ingredientsCheckedStore, setIngredientsCheckedStore] = useState('');

  const contextValue = {
    recipes,
    setRecipes,
    isSearching,
    setIsSearching,
    doneRecipes,
    setDoneRecipes,
    selectedIngredient,
    setSelectedIngredient,
    ingredientsCheckedStore,
    setIngredientsCheckedStore,
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
