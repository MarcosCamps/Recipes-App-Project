import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchSearchById } from '../services/apiRequests';

export default function Details({ id, type }) {
  const [detailsArray, setDetailsArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  let typeName = 'strDrink';
  let category = 'strAlcoholic';
  if (type === 'foods') {
    typeName = 'strMeal';
    category = 'strCategory';
  }

  useEffect(() => {
    function renderIngredients() {
      let count = 1;
      let haveIngredient = true;
      const result = [];
      while (haveIngredient) {
        if (detailsArray[`strIngredient${count}`]) {
          const ing = detailsArray[`strIngredient${count}`];
          const mesuare = detailsArray[`strMeasure${count}`];
          result.push(`${ing} ${mesuare}`);
          count += 1;
        } else {
          haveIngredient = false;
        }
      }
      setIsLoadingDetails(false);
      return result;
    }

    const getDetails = async () => {
      const result = await fetchSearchById(id, type);
      if (type === 'foods') {
        const { meals } = result;
        const [initial] = meals;
        setDetailsArray(initial);
      } else {
        const { drinks } = result;
        const [initial] = drinks;
        setDetailsArray(initial);
      }
      setIngredients(renderIngredients());
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
          >
            Share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
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
          <button
            type="button"
            data-testid="video"
          >
            Start
          </button>
        </>) }
    </section>
  );
}

Details.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

/*
O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
*/
