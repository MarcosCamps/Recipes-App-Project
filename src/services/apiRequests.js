async function handleFetch(endpoint) {
  const fetchAPi = await fetch(endpoint);
  const response = await fetchAPi.json();
  console.log(response);
  return response;
}

export async function fetchSearchByIngredient(ingredient, type) {
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  if (type === 'Foods') return handleFetch(foodEndpoint);
  if (type === 'Drinks') return handleFetch(drinkEndpoint);
}

export async function fetchSearchByName(name, type) {
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  if (type === 'Foods') return handleFetch(foodEndpoint);
  if (type === 'Drinks') return handleFetch(drinkEndpoint);
}

export async function fetchByFirstLetter(firstLetter, type) {
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  if (type === 'Foods') return handleFetch(foodEndpoint);
  if (type === 'Drinks') return handleFetch(drinkEndpoint);
}

export async function randomAPIMeal() {
  const foodEndpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return handleFetch(foodEndpoint);
}

export async function randomAPIDrink() {
  const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return handleFetch(drinkEndpoint);
}

export async function fetchFoodIngredients() {
  const foodsIngredientsEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  return handleFetch(foodsIngredientsEndpoint);
}

export async function fetchDrinkIngredients() {
  const drinksIngredientsEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return handleFetch(drinksIngredientsEndpoint);
}

export async function fetchCategories(type) {
  const foodENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinkENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  if (type === 'meals') return handleFetch(foodENDPOINT);
  if (type === 'drinks') return handleFetch(drinkENDPOINT);
}

export async function fetchRenderCategories(type, categorie) {
  const foodENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`;
  const drinkENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;
  console.log(foodENDPOINT);
  if (type === 'meals') {
    return handleFetch(foodENDPOINT);
  } if (type === 'drinks') {
    return handleFetch(drinkENDPOINT);
  }
}

export async function fetchByNacionality() {
  const nacionalityEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  return handleFetch(nacionalityEndpoint);
}

export async function fetchFoodNacionality(value) {
  const foodNacionalityEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
  return handleFetch(foodNacionalityEndpoint);
}
