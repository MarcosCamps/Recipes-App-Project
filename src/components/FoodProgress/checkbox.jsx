import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../../context/RecipesContext';

function CheckboxProgress(props) {
  const [ingredientsChecked, setIngredientsChecked] = useState('');
  const { setIngredientsCheckedStore } = useContext(recipesContext);
  const historyStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { Ingredients, id, type, ofType } = props;

  useEffect(() => {
    if (historyStorage !== null && ingredientsChecked === '') {
      setIngredientsChecked(historyStorage[type][id]);
    }
    if (historyStorage === null) {
      const firstStorage = {
        [ofType]: {},
        [type]: {
          [id]: ingredientsChecked,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(firstStorage));
      setIngredientsCheckedStore(ingredientsChecked);
    } else {
      const addStorage = {
        [ofType]: historyStorage[ofType],
        [type]: {
          [id]: ingredientsChecked,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(addStorage));
      setIngredientsCheckedStore(ingredientsChecked);
    }
  }, [Ingredients,
    id, type, ofType, ingredientsChecked, historyStorage, setIngredientsCheckedStore]);

  const addIngredientsCheckeds = ({ target }) => {
    if (target.checked === true) {
      const addIngredients = [...ingredientsChecked, target.value];
      setIngredientsChecked(addIngredients);
    }
    if (target.checked === false) {
      const removeIngredients = ingredientsChecked
        .filter((ingredient) => ingredient !== target.value);
      setIngredientsChecked(removeIngredients);
    }
  };

  const validate = Ingredients()
    .map((i) => {
      if (ingredientsChecked !== '') {
        const result = ingredientsChecked.some((e) => e === i);
        return result;
      } return false;
    });

  return (
    <div>
      { Ingredients().map((ingredient, index) => {
        if (ingredient) {
          return (
            <div
              className="ingredient"
              data-testid={ `${index}-ingredient-step` }
              key={ index }
            >
              <label
                htmlFor={ `ingredient${index}` }
              >
                { ingredient }
              </label>
              <input
                type="checkbox"
                value={ ingredient }
                id={ `ingredient${index}` }
                onChange={ addIngredientsCheckeds }
                defaultChecked={ validate[index] }
              />
            </div>
          );
        } return null;
      }) }
    </div>
  );
}

CheckboxProgress.propTypes = {
  id: PropTypes.objectOf(PropTypes.object).isRequired,
  Ingredients: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  ofType: PropTypes.string.isRequired,
};

export default CheckboxProgress;
