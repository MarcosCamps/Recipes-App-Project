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
      >
        <img src={ drinkIcon } style={ { filter: '#fafafa' } } alt="drinkIcon" />

      </a>
      <a
        href="/explore"
        src="exploreIcon"
        data-testid="explore-bottom-btn"
      >
        <img src={ exploreIcon } alt="exploreIcon" />

      </a>
      <a
        href="/foods"
        src="mealIcon"
        data-testid="food-bottom-btn"
      >
        <img src={ mealIcon } alt="mealIcon" />

      </a>
    </footer>
  );
}

export default Footer;
