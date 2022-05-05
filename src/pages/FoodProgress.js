import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchForID } from '../services/apiRequests';
import CheckboxProgress from '../components/FoodProgress/checkbox';

function FoodProgress(props) {
  const { match: { params: { id } } } = props;
  const [informations, setInformations] = useState('');

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
          width="300px"
          alt="photoMeal"
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{ informations.strMeal }</h2>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <h3 data-testid="recipe-category">{ informations.strCategory }</h3>
        <CheckboxProgress
          Ingredients={ Ingredients }
          id={ id }
          type="meals"
          ofType="cocktails"
        />
        <h4 data-testid="instructions">{ informations.strInstructions }</h4>
        <button data-testid="finish-recipe-btn" type="button">Finalizar receita</button>
      </div>
    )
  );
}

FoodProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FoodProgress;
