import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchForID } from '../services/apiRequests';
import CheckboxProgress from '../components/FoodProgress/checkbox';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from '../components/FoodProgress/favoriteBtn';
import FinishReceipe from '../components/FoodProgress/FinishReceipe';
import '../Styles/ReceipeProgress.css';

const copy = require('clipboard-copy');

function FoodProgress(props) {
  const { match: { params: { id } } } = props;
  const [informations, setInformations] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const copiedText = 'Link copied!';

  function copyUrl() {
    setIsCopied(true);
    const url = `http://localhost:3000/foods/${id}`;
    copy(url);
  }

  useEffect(() => {
    const informationFetch = async () => {
      const response = await fetchForID('meals', id);
      setInformations(response.meals[0]);
    };
    informationFetch();
  }, [id]);

  const Ingredients = () => {
    const maxIngredients = 20;
    const ingredients = [];
    for (let index = 1; index <= maxIngredients; index += 1) {
      ingredients.push(informations[`strIngredient${index}`]);
    }
    return ingredients;
  };

  return (
    informations === '' ? <p>Carregando</p> : (
      <div>
        <img
          src={ informations.strMealThumb }
          id="photo-progress"
          width="360px"
          alt="photoMeal"
          data-testid="recipe-photo"
        />
        <h2
          data-testid="recipe-title"
          className="titleProgress"
        >
          { informations.strMeal }

        </h2>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => copyUrl() }
          className="buttonProgress buttonShareProgress"
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <p className="textCopiedProgress">{ isCopied && copiedText }</p>
        <FavoriteBtn
          id={ id }
          informations={ informations }
          type={ ['food', 'Meal'] }
        />
        <h3
          data-testid="recipe-category"
          className="categoryProgress"
        >
          { `Category: ${informations.strCategory}` }
        </h3>
        <CheckboxProgress
          Ingredients={ Ingredients }
          id={ id }
          type="meals"
          ofType="cocktails"
        />
        <h4 data-testid="instructions">{ informations.strInstructions }</h4>
        <FinishReceipe
          Ingredients={ Ingredients }
          Information={ informations }
          type="Meal"
        />
      </div>
    )
  );
}

FoodProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FoodProgress;
