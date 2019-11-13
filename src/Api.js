const getResponse = async (url) => {
  const pokemons = await fetch(url);

  return pokemons.json();
};

export const loadPokemonsFromServer = async (url) => {
  return await getResponse(url);
};

export const getPokemonInfo = async (url) => {
  return await getResponse(url);
};

export const getAllTypes = async (url) => {
  return await getResponse(url);
}

