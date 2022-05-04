import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/RecipesContext';
import { fetchDrinkIngredients } from '../services/apiRequests';

const limit = 12;

function ExploreDrinkByIngredient() {
  const { setSelectedIngredient } = useContext(recipesContext);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const history = useHistory();
  const { drinks } = drinkIngredients;

  useEffect(() => {
    const drinkIngredientsFetch = async () => {
      const response = await fetchDrinkIngredients();
      setDrinkIngredients(response);
    };
    drinkIngredientsFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (ingredient) => {
    // console.log(ingredient);
    setSelectedIngredient(ingredient);
    history.push('/drinks');
  };

  return (
    <>
      <Header Title="Explore Ingredients" />
      <h1>Tela de Explore Drink By Ingredient</h1>
      {drinks && drinks.slice(0, limit).map((element, index) => (
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          role="presentation"
          onClick={ () => handleClick(element.strIngredient1) }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${element
              .strIngredient1}-Small.png` }
            alt={ `https://www.thecocktaildb.com/images/ingredients/${element
              .strIngredient1}-Small.png` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{element.strIngredient1}</p>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default ExploreDrinkByIngredient;
