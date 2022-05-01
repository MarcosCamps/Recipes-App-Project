import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();

  const handleClickFood = () => {
    history.push('/explore/foods');
  };

  const handleClickDrinks = () => {
    history.push('/explore/drinks');
  };
  return (
    <>
      <Header Title="Explore" />
      <h1>Tela de Explore</h1>
      <div>
        <button
          data-testid="explore-foods"
          type="submit"
          name="enterButton"
          onClick={ handleClickFood }
        >
          Explore Foods
        </button>
        {' '}
        <button
          data-testid="explore-drinks"
          type="submit"
          name="enterButton"
          onClick={ handleClickDrinks }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
