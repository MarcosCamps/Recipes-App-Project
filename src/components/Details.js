import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchSearchById, fetchSixByType } from '../services/apiRequests';
import '../Styles/Carousel.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import StartRecipeBtn from './StartRecipeBtn';

const copy = require('clipboard-copy');

export default function Details({ id, type }) {
  const [detailsArray, setDetailsArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [recomendations, setRecomendations] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const copiedText = 'Link copied!';
  let typeName = 'strDrink';
  let category = 'strAlcoholic';
  let keyType = 'drinks';
  let recomendationsType = 'meals';
  let recomendationsTypeName = 'strMeal';
  let recomendationsThumb = 'strMealThumb';
  let progressType = 'cocktails';
  let imageType = 'strDrinkThumb';

  if (type === 'foods') {
    typeName = 'strMeal';
    category = 'strCategory';
    keyType = 'meals';
    recomendationsType = 'drinks';
    recomendationsTypeName = 'strDrink';
    recomendationsThumb = 'strDrinkThumb';
    progressType = 'meals';
    imageType = 'strMealThumb';
  }

  function copyUrl(theType, theId) {
    setIsCopied(true);
    const url = `http://localhost:3000/${theType}/${theId}`;
    copy(url);
  }

  function buttonToRender() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isDoneEmpity = (doneRecipes) || [];
    isDoneEmpity.forEach((recipe) => {
      if (recipe.id === id) {
        setIsDoneRecipe(true);
      }
    });
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
      buttonToRender();
    };
    getDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      { !isLoadingDetails && (
        <>
          <img
            src={ detailsArray[imageType] }
            alt={ `${type}` }
            style={ { width: '160px' } }
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
            <img src={ shareIcon } alt="Share button" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
          >
            <img src={ whiteHeartIcon } alt="Share button" />
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
            { recomendations.map((card, index) => (
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
          { !isDoneRecipe && (
            <StartRecipeBtn type={ type } id={ id } progressType={ progressType } />)}
        </>) }
    </section>
  );
}

Details.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
