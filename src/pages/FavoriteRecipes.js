import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

let allFavRecipes = [];

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const copiedText = 'Link copied!';
  useEffect(() => {
    function getFavRecipes() {
      const response = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavRecipes(response);
      allFavRecipes = response;
    }
    getFavRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function copyUrl(type, id) {
    setIsCopied(true);
    const url = `http://localhost:3000/${type}s/${id}`;
    copy(url);
  }

  function onClickFilter(type) {
    const filtered = allFavRecipes.filter((recipe) => recipe.type === type);
    setFavRecipes(filtered);
  }

  function topText(recipe) {
    if (recipe.type === 'food') {
      return (`${recipe.nationality} - ${recipe.category}`);
    }
    return (`${recipe.alcoholicOrNot}`);
  }

  function unfavoriteRecipe(unfav) {
    const newArray = favRecipes.filter((_ele, index) => index !== unfav);
    setFavRecipes(newArray);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  }

  return (
    <section style={ { 'margin-top': '70px' } }>
      <Header Title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => onClickFilter('drink') }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => onClickFilter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFavRecipes(allFavRecipes) }
      >
        All
      </button>
      { favRecipes && favRecipes.map((recipe, index) => (
        <section key={ recipe.name }>
          <p>{ recipe.id }</p>
          <p>{ recipe.type }</p>
          <p>{ recipe.nationality }</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { topText(recipe) }
          </p>
          <p>{ recipe.alcoholicOrNot }</p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="Imagem da receita"
              width="300px"
            />
          </Link>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
          </Link>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyUrl(recipe.type, recipe.id) }
            src={ shareIcon }
          >
            <img
              src={ shareIcon }
              alt="Button to share the recipe"
            />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => unfavoriteRecipe(index) }
            src={ blackHeartIcon }
          >
            <img
              src={ blackHeartIcon }
              alt="Unfavorite recipe"
            />
          </button>
          <p>{ isCopied && copiedText }</p>
        </section>
      )) }
    </section>
  );
}

export default FavoriteRecipes;
