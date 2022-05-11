import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchSearchById, fetchSixByType } from '../services/apiRequests';
import '../Styles/Carousel.css';

const copy = require('clipboard-copy');

export default function Details({ id, type }) {
  const [detailsArray, setDetailsArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [recomendations, setRecomendations] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const copiedText = 'Link copied!';
  let typeName = 'strDrink';
  let category = 'strAlcoholic';
  let keyType = 'drinks';
  let recomendationsType = 'meals';
  let recomendationsTypeName = 'strMeal';
  let recomendationsThumb = 'strMealThumb';
  let progressType = 'cocktails';

  if (type === 'foods') {
    typeName = 'strMeal';
    category = 'strCategory';
    keyType = 'meals';
    recomendationsType = 'drinks';
    recomendationsTypeName = 'strDrink';
    recomendationsThumb = 'strDrinkThumb';
    progressType = 'meals';
  }

  function copyUrl(theType, theId) {
    setIsCopied(true);
    const url = `http://localhost:3000/${theType}s/${theId}`;
    copy(url);
  }

  function renderButton() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let isDoneRecipe = false;
    let isInProgressRecipe = false;
    doneRecipes.forEach((recipe) => {
      if (recipe.name === detailsArray[typeName]) {
        isDoneRecipe = true;
      }
    });
    const idArray = Object.keys(inProgressRecipes[progressType]);
    idArray.forEach((element) => {
      if (element === id) {
        isInProgressRecipe = true;
      }
    });
    if (!isDoneRecipe) {
      return (
        <Link to={ `/${type}/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Start
          </button>
        </Link>
      );
    }
    if (isInProgressRecipe) {
      return (
        <button
          type="button"
          data-testid="continue-recipe-btn"
        >
          Continue
        </button>
      );
    }
  }

  useEffect(() => {
    function renderIngredients(recipe) {
      let count = 1;
      const result = [];
      let noMeasure = 'str';
      do {
        const ing = recipe[`strIngredient${count}`];
        const mesuare = recipe[`strMeasure${count}`];
        result.push(`${ing} ${mesuare}`);
        count += 1;
        noMeasure = recipe[`strIngredient${count}`];
      }
      while (noMeasure);
      setIsLoadingDetails(false);
      return result;
    }

    const getDetails = async () => {
      const result = await fetchSearchById(id, type);
      setDetailsArray(result[keyType][0]);
      const recipes = renderIngredients(result[keyType][0]);
      setIngredients(recipes);
      const recomendationsResult = await fetchSixByType(recomendationsType);
      setRecomendations(recomendationsResult);
    };
    getDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      { !isLoadingDetails && (
        <>
          <img
            src={ detailsArray.strImageSource }
            alt={ `${type}` }
            data-testid="recipe-photo"
          />
          <h2
            data-testid="recipe-title"
          >
            { detailsArray[typeName] }
          </h2>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyUrl(type, id) }
          >
            <img src="../images/shareIcon" alt="Share button" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
          <p>{ isCopied && copiedText }</p>
          <p data-testid="recipe-category">{ detailsArray[category] }</p>
          <ul>
            { ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ingredient }
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{ detailsArray.strInstructions }</p>
          { detailsArray.strYoutube
            && <iframe
              width="300px"
              height="200px"
              data-testid="video"
              src={ `${detailsArray.strYoutube}?autoplay=0` }
              title="Vídeo da receita"
            /> }
          <div data-testid="recomendation-card" className="carousel">
            { recomendations && recomendations.map((card, index) => (
              <div key={ index } className="item">
                <img
                  data-testid={ `${index}-recomendation-card` }
                  src={ card[recomendationsThumb] }
                  alt="Recomandation thumb"
                />
                <h3
                  data-testid={ `${index}-recomendation-title` }
                  className="carousel-title"
                >
                  { card[recomendationsTypeName] }
                </h3>
              </div>
            )) }
          </div>
          <footer className="footerPage">
            { detailsArray && renderButton }
          </footer>
        </>) }
    </section>
  );
}

Details.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
