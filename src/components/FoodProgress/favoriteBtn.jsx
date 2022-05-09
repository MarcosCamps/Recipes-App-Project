import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import favoriteIconWhite from '../../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../../images/blackHeartIcon.svg';

function FavoriteBtn(props) {
  const { id, informations, type } = props;
  const responseStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [buttonFav, setButtonFav] = useState(false);
  const alcooHolic = type[0] === 'drink' ? informations.strAlcoholic : '';
  const nationality = type[0] === 'drink' ? '' : informations.strArea;
  const addItem = [{
    id,
    type: type[0],
    nationality,
    category: informations.strCategory,
    alcoholicOrNot: alcooHolic,
    name: informations[`str${type[1]}`],
    image: informations[`str${type[1]}Thumb`],
  }];

  useEffect(() => {
    if (responseStorage !== null) {
      const validateButtonFav = responseStorage.some((recipes) => recipes.id === id);
      setButtonFav(validateButtonFav);
    }
  }, [id, responseStorage]);

  const ClickButtonFavorite = () => {
    if (buttonFav === true && responseStorage !== null) {
      const removeItem = JSON.stringify(responseStorage.filter((e) => e.id !== id));
      localStorage.setItem('favoriteRecipes', removeItem);
    } else if (buttonFav === false && responseStorage === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(addItem));
    } else if (buttonFav === false && responseStorage !== null) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...addItem, ...responseStorage]));
    }
    setButtonFav(!buttonFav);
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ ClickButtonFavorite }
      src={ buttonFav === false ? favoriteIconWhite : favoriteIconBlack }
      alt="favorite-btn"
    >
      <img
        src={ buttonFav === false ? favoriteIconWhite : favoriteIconBlack }
        alt="shareIcon"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
  informations: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteBtn;
