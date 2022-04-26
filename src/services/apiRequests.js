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
