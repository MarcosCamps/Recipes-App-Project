async function handleFetch(endpoint) {
  const fetchAPi = await fetch(endpoint);
  const response = await fetchAPi.json();
  return response;
}

export async function fetchSearchById(id, type) {
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (type === 'foods') return handleFetch(foodEndpoint);
  if (type === 'drinks') return handleFetch(drinkEndpoint);
}

export async function fetchSearchByIngredient(ingredient, type) {
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  if (type === 'Foods') return handleFetch(foodEndpoint);
  if (type === 'Drinks') return handleFetch(drinkEndpoint);
}

export async function fetchSixByType(type) {
  const foodEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const MAGIC_NUMBER = 6;
  if (type === 'meals') {
    const foods = await handleFetch(foodEndpoint);
    console.log(foods.meals);
    const result = foods.meals.slice(0, MAGIC_NUMBER);
    console.log(result);
    return result;
  }
  if (type === 'drinks') {
    const drinks = await handleFetch(drinkEndpoint);
    console.log(drinks.drinks);
    const result = drinks.drinks.slice(0, MAGIC_NUMBER);
    console.log(result);
    return result;
  }
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

export async function fetchForID(type, id) {
  const foodENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinkENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (type === 'meals') {
    return handleFetch(foodENDPOINT);
  } if (type === 'drinks') {
    return handleFetch(drinkENDPOINT);
  }
}
