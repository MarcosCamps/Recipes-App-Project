import PropTypes, { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import recipesContext from '../../context/RecipesContext';

function FinishReceipe(props) {
  const { Ingredients, Information, type } = props;
  const { ingredientsCheckedStore } = useContext(recipesContext);
  const [validateBtn, setValidateBtn] = useState(true);
  const [redirectLink, setRedirectLink] = useState(false);
  const responseStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(Ingredients(), 'allingredients');
  console.log(ingredientsCheckedStore, 'ingredients checked');

  useEffect(() => {
    const removeStringNull = Ingredients()
      .filter((e) => e !== '' && e !== null && e !== undefined);
    if (ingredientsCheckedStore.length > 0) {
      const validateIngredient = removeStringNull.map((e) => {
        const boolean = ingredientsCheckedStore.some((a) => a === e);
        return boolean;
      }).some((e) => e === false);
      setValidateBtn(validateIngredient);
    }
  }, [Ingredients, ingredientsCheckedStore]);

  console.log(Information, 'info');

  const Finish = () => {
    let tags = '';
    if (typeof Information.strTags !== 'string' && Information.strTags !== null) {
      tags = [...Information.strTags];
    } else if (Information.strTags !== null) {
      tags = Information.strTags;
    }

    const progressModel = {
      cocktails: {},
      meals: {},
    };

    const responseModel = {
      id: Information[`id${type}`],
      type,
      nationality: type === 'Drink' ? '' : Information.strArea,
      category: Information.strCategory,
      alcoholicOrNot: type === 'Drink' ? Information.strAlcoholic : '',
      name: Information[`str${type}`],
      image: Information[`str${type}Thumb`],
      doneDate: new Date(),
      tags: type === 'Drink' ? [] : tags,
    };
    if (responseStorage !== null) {
      localStorage
        .setItem('doneRecipes', JSON.stringify([...responseStorage, responseModel]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([responseModel]));
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressModel));
    setRedirectLink(true);
  };

  return (
    <>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ validateBtn }
        onClick={ Finish }
      >
        Finalizar receita
      </button>
      { redirectLink && <Redirect to="/done-recipes" /> }
    </>
  );
}

FinishReceipe.propTypes = {
  Information: PropTypes.arrayOf(string).isRequired,
  Ingredients: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default FinishReceipe;
