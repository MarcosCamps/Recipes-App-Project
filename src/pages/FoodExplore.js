import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { randomAPIMeal } from '../services/apiRequests';

function FoodExplore({ history }) {
  const handleRandomMeal = async () => {
    const randomMeal = await randomAPIMeal();
    console.log(randomMeal.meals[0].idMeal);
    history.push(`/foods/${randomMeal.meals[0].idMeal}`);
  };
  return (
    <div>
      <Header Title="Explore Foods" />
      <section>
        <Link to="/explore/foods/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleRandomMeal() }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}

FoodExplore.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default FoodExplore;
