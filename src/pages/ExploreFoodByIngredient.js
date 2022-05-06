import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import recipesContext from '../context/RecipesContext';
import { fetchFoodIngredients } from '../services/apiRequests';

const limit = 12;

function ExploreFoodByIngredient() {
  const { setSelectedIngredient } = useContext(recipesContext);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const history = useHistory();
  const { meals } = foodIngredients;

  useEffect(() => {
    const foodIngredientsFetch = async () => {
      const response = await fetchFoodIngredients();
      setFoodIngredients(response);
    };
    foodIngredientsFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (ingredient) => {
    // console.log(ingredient);
    setSelectedIngredient(ingredient);
    history.push('/foods');
  };

  return (
    <>
      <Header Title="Explore Ingredients" />
      <h1>Tela de Explore Food By Ingredient</h1>
      {meals && meals.slice(0, limit).map((element, index) => (
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          role="presentation"
          onClick={ () => handleClick(element.strIngredient) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${element
              .strIngredient}-Small.png` }
            alt={ `https://www.themealdb.com/images/ingredients/${element
              .strIngredient}-Small.png` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{element.strIngredient}</p>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodByIngredient;
