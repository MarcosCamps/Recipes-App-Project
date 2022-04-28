export const mockedLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => delete store[key],
    clear: () => {
      store = {};
    },
  };
})();

export const setLocalStorage = () => {
  Object.defineProperty(window, 'localStorage', {
    value: mockedLocalStorage,
  });
  const email = { email: 'email@test.com' };
  window.localStorage.setItem('user', JSON.stringify(email));
  window.localStorage.setItem('mealsToken', '1');
  window.localStorage.setItem('cocktailsToken', '1');
  window.localStorage.setItem('doneRecipes', '[]');
  window.localStorage.setItem('favoriteRecipes', '[]');
  window.localStorage.setItem('inProgressRecipes', '{}');
};
