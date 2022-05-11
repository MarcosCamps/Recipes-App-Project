import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { randomAPIDrink } from '../services/apiRequests';

function DrinkExplore({ history }) {
  const handleRandomDrink = async () => {
    const randomDrink = await randomAPIDrink();
    history.push(`/drinks/${randomDrink.drinks[0].idDrink}`);
  };
  return (
    <div style={ { 'margin-top': '70px' } }>
      <Header Title="Explore Drinks" />
      <section>
        <Link to="/explore/drinks/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleRandomDrink() }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}

DrinkExplore.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default DrinkExplore;
