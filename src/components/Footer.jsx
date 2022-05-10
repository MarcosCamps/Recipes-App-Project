import React from 'react';
import '../Styles/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footerPage">
      <a
        href="/drinks"
        src="drinkIcon"
        data-testid="drinks-bottom-btn"
        className="drinkIcon"
      >
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          className="imgFooter"
        />

      </a>
      <a
        href="/explore"
        src="exploreIcon"
        data-testid="explore-bottom-btn"
      >
        <img
          src={ exploreIcon }
          alt="exploreIcon"
          className="imgFooter"
        />

      </a>
      <a
        href="/foods"
        src="mealIcon"
        data-testid="food-bottom-btn"
        className="mealIcon"
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
          className="imgFooter"
        />

      </a>
    </footer>
  );
}

export default Footer;
