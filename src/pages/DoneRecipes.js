import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import recipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

let allDoneRecipes = [];

function DoneRecipes() {
  const {
    doneRecipes,
    setDoneRecipes,
  } = useContext(recipesContext);
  const [isCopied, setIsCopied] = useState(false);
  const copiedText = 'Link copied!';

  function copyUrl(type, id) {
    setIsCopied(true);
    const url = `http://localhost:3000/${type}s/${id}`;
    copy(url);
  }

  function topText(recipe) {
    if (recipe.type === 'food') {
      return (`${recipe.nationality} - ${recipe.category}`);
    }
    return (`${recipe.alcoholicOrNot}`);
  }

  function onClickFilter(type) {
    const filtered = doneRecipes.filter((recipe) => recipe.type === type);
    setDoneRecipes(filtered);
  }

  useEffect(() => {
    function getDoneRecipes() {
      const response = JSON.parse(localStorage.getItem('doneRecipes'));
      allDoneRecipes = response;
      setDoneRecipes(response);
    }
    getDoneRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header Title="Done Recipes" />
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
        onClick={ () => setDoneRecipes(allDoneRecipes) }
      >
        All
      </button>
      { doneRecipes && doneRecipes.map((recipe, index) => (
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
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <ul>
            { recipe.tags && recipe.tags.map((tag) => (
              <li
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyUrl(recipe.type, recipe.id) }
            src="../images/shareIcon"
          >
            <img
              src="../images/shareIcon"
              alt="Button to share the recipe"
            />
          </button>
          <p>{ isCopied && copiedText }</p>
        </section>
      )) }
    </>
  );
}

export default DoneRecipes;
