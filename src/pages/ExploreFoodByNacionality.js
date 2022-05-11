import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchByNacionality, fetchSearchByName, fetchFoodNacionality }
from '../services/apiRequests';
import '../Styles/home.css';

const limit = 12;

function ExploreFoodByNationality() {
  const { setRecipes, setIsSearching, isSearching, recipes } = useContext(recipesContext);
  const [nacionality, setNacionality] = useState([]);
  const [foodNacionality, setFoodNacionality] = useState('food');
  const { meals } = nacionality;
  const history = useHistory();

  const foodNacionalityFetch = async (value = '') => {
    if (value === 'All') {
      setIsSearching(true);
    } else {
      const data = await fetchFoodNacionality(value);
      setFoodNacionality(data);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const exploreNacionalityFetch = async () => {
      const response = await fetchByNacionality();
      setNacionality(response);
    };
    const recipesFetch = async () => {
      const response = await fetchSearchByName('', 'Foods');
      setRecipes(response);
      setIsSearching(true);
    };
    exploreNacionalityFetch();
    if (foodNacionality === 'food') recipesFetch();
    if (foodNacionality !== 'food') foodNacionalityFetch(foodNacionality);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (id) => {
    history.push(`/foods/${id}`);
  };

  return (
    <>
      <Header Title="Explore Nationalities" />
      <h1>Tela de Explore Food By Nationality</h1>
      <label htmlFor="nacionalityFood">
        <select
          id="nacionalityFood"
          data-testid="explore-by-nationality-dropdown"
          name="nacionality"
          onChange={ (e) => foodNacionalityFetch(e.target.value) }
        >
          <option data-testid="All-option">All</option>
          {meals && meals.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ index }
              value={ strArea }
            >
              { strArea }
            </option>
          ))}
        </select>
      </label>
      <section className="recipes-container">
        {isSearching
          ? recipes && recipes.meals.slice(0, limit).map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              role="presentation"
              onClick={ () => handleClick(recipe.idMeal) }
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            </div>
          ))
          : (
            foodNacionality.meals && foodNacionality.meals.slice(0, limit)
              .map((el, index) => (
                <div
                  key={ index }
                  role="presentation"
                  data-testid={ `${index}-recipe-card` }
                  onClick={ () => handleClick(el.idMeal) }
                >
                  <img
                    src={ el.strMealThumb }
                    alt={ el.strMealThumb }
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>{el.strMeal}</p>
                </div>
              ))
          )}
      </section>
      <Footer />
    </>
  );
}

export default ExploreFoodByNationality;
