import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function StartRecipeBtn({ type, id, progressType }) {
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);
  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const idArray = Object.keys(inProgressRecipes[progressType]);
      idArray.forEach((element) => {
        if (element === id) {
          setIsInProgressRecipe(true);
        }
      });
    }
  }, []);
  return (
    <Link to={ `/${type}/${id}/in-progress` }>
      <button
        type="button"
        className="progress-recipe-btn"
        data-testid="start-recipe-btn"
      >
        {isInProgressRecipe ? 'Continue Recipe' : 'Start'}
      </button>
    </Link>
  );
}
StartRecipeBtn.propTypes = {
  type: PropTypes.string,
}.isRequired;
export default StartRecipeBtn;
