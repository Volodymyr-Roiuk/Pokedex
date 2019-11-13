import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {getAllTypes, loadPokemonsFromServer} from './Api';

//action types
const HANDLE_LOADING_SUCCESS = 'HANDLE_LOADING_SUCCESS';
const SET_POKEMONS_INFO = 'SET_POKEMONS_INFO';
const SET_SELECTED_POKEMON = 'SET_SELECTED_POKEMON';
const SET_POKEMON_TYPES = 'SET_POKEMON_TYPES';
const FILTER_POKEMONS = 'FILTER_POKEMONS';
const SET_FILTER_QUERY = 'SET_FILTER_QUERY';

//action creators
const handleSuccess = (serverInfo) => ({ type: HANDLE_LOADING_SUCCESS, serverInfo });
const setPokemonTypes = (types) => ({ type: SET_POKEMON_TYPES, types });
export const setPokemonsInfo = (pokemonsInfo) => ({ type: SET_POKEMONS_INFO, pokemonsInfo });
export const setSelectedPokemon = (name) => ({ type: SET_SELECTED_POKEMON, name});
export const filterPokemons = () => ({ type: FILTER_POKEMONS });
export const setFilterQuery = (filterQuery) => ({ type: SET_FILTER_QUERY, filterQuery});
export const loadPokemons = (url) => {
  return (dispatch) => {
    loadPokemonsFromServer(url)
      .then(pokemons => dispatch(handleSuccess(pokemons)));
  };
};
export const loadPokemonTypes = (url) => {
  return (dispatch) => {
    getAllTypes(url)
      .then(types => dispatch(setPokemonTypes(types)));
  };
};


//selectors
export const getPokemons = state => state.pokemons;
export const getPokemonsInfo = state => state.pokemonsInfo;
export const getSelectedPokemon = state => state.selectedPocemon;
export const getSeverInfo = state => state.serverInfo;
export const getPokemonTypes = state => state.pokemonTypes;
export const getFilteredPokemons = state => state.filteredPokemons;


//state
const initialState = {
  serverInfo: null,
  pokemons: [],
  pokemonsInfo: null,
  selectedPocemon: null,
  pokemonTypes: null,
  filteredPokemons: null,
  filterQuery: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_LOADING_SUCCESS:
      return ({
        ...state,
        serverInfo: action.serverInfo,
        pokemons: [...state.pokemons, ...action.serverInfo.results]
      });
    case SET_POKEMONS_INFO:
      return ({ ...state, pokemonsInfo: action.pokemonsInfo });
    case SET_SELECTED_POKEMON:
      return ({ ...state, selectedPocemon: action.name });
    case SET_POKEMON_TYPES:
      return ({ ...state, pokemonTypes: action.types });
    case SET_FILTER_QUERY:
      return ({ ...state, filterQuery: action.filterQuery });
    case FILTER_POKEMONS: {
      let filteredPokemons = state.pokemonsInfo.filter(pokemon => pokemon.types.some(typeItem => typeItem.type.name === state.filterQuery));

      filteredPokemons = filteredPokemons.length > 0 ? filteredPokemons : null;

      return ({ ...state, filteredPokemons });
    }
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
