import PropTypes, { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import recipesContext from '../../context/RecipesContext';

function FinishReceipe(props) {
  const { Ingredients, Information, type } = props;
  const { ingredientsCheckedStore } = useContext(recipesContext);
  const [validateBtn, setValidateBtn] = useState(true);
  const [redirectLink, setRedirectLink] = useState(false);
  const responseStorage = JSON.parse(localStorage.getItem('doneRecipes'));

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

  const Finish = () => {
    let tags = '';
    if (typeof Information.strTags !== 'string' && Information.strTags !== null) {
      tags = [...Information.strTags];
    } else if (Information.strTags !== null) {
      tags = Information.strTags.split(',');
    }

    const responseModel = {
      id: Information[`id${type}`],
      type: type === 'Drink' ? 'drink' : 'food',
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
    localStorage.setItem('inProgressRecipes', JSON.stringify(null));
    setRedirectLink(true);
  };

  return (
    <>
      <Button
        data-testid="finish-recipe-btn"
        className="finishProgress"
        type="button"
        disabled={ validateBtn }
        onClick={ Finish }
        variant="warning"
      >
        Finalizar receita
      </Button>
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
