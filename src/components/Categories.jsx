import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import recipesContext from '../context/RecipesContext';
// import { butto } from 'react-bootstrap';
import { fetchCategories, fetchRenderCategories } from '../services/apiRequests';

function Categories(props) {
  const { setRecipes, recipes } = useContext(recipesContext);
  const { Type } = props;
  const [categories, setCategories] = useState('');
  const [noFilterItems, setNoFilterItems] = useState('');
  const [validateButton, setValidateButton] = useState(false);
  const [validateCategorie, setValidateCategorie] = useState('');
  const maxCategories = 5;

  useEffect(() => {
    const categoriesFetch = async () => {
      const response = await fetchCategories(Type);
      setCategories(response);
    };
    categoriesFetch();
  }, [Type, recipes]);

  const categoriesItemsFetch = async ({ target }) => {
    setNoFilterItems(recipes);
    console.log(typeof target.name);
    if (validateButton === false || validateCategorie !== target.name) {
      const response = await fetchRenderCategories(Type, target.name);
      setRecipes(response);
      setValidateCategorie(target.name);
      setValidateButton(!validateButton);
    } else if (validateButton === true) {
      setRecipes(noFilterItems);
      setValidateButton(!validateButton);
    }
  };

  const returnAll = () => {
    setRecipes(noFilterItems);
  };

  const renderizeCategories = categories[Type] === undefined ? (<p>Carregando</p>) : (
    <div>
      {categories[Type].slice(0, maxCategories).map((categorie, index) => (
        <button
          type="button"
          key={ index }
          name={ categorie.strCategory }
          data-testid={ `${categorie.strCategory}-category-filter` }
          onClick={ categoriesItemsFetch }
        >
          { categorie.strCategory }
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ returnAll }
      >
        All
      </button>
    </div>);

  console.log(categories[Type], 'categories aqui');
  return (
    <div>
      { renderizeCategories }
    </div>
  );
}

Categories.propTypes = {
  Type: PropTypes.string.isRequired,
};

export default Categories;
