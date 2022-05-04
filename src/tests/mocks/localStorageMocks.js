const email = { email: 'email@test.com' };
export const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
export const oneFavoriteArray = [{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
},
];

export default function setLocalStorage() {
  window.localStorage.setItem('user', JSON.stringify(email));
  window.localStorage.setItem('mealsToken', '1');
  window.localStorage.setItem('cocktailsToken', '1');
  window.localStorage.setItem('doneRecipes', '[]');
  window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  window.localStorage.setItem('inProgressRecipes', '{}');
}
