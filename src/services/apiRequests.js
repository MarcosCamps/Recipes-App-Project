async function handleFetch(endpoint) {
  const fetchAPi = await fetch(endpoint);
  const response = await fetchAPi.json();
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

export async function fetchForID(type, id) {
  const foodENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinkENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (type === 'meals') {
    return handleFetch(foodENDPOINT);
  } if (type === 'drinks') {
    return handleFetch(drinkENDPOINT);
  }
}
