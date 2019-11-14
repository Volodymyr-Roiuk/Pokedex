import React, { useEffect } from 'react';
import './PokemonList.css';
import { connect } from 'react-redux';
import { loadPokemons, getPokemons, getPokemonsInfo, setPokemonsInfo, getSelectedPokemon, getSeverInfo, setSelectedPokemon, getPokemonTypes, loadPokemonTypes, setFilterQuery, getFilteredPokemons, filterPokemons } from '../../store';
import { Dimmer, Loader, Image, Segment, Select } from 'semantic-ui-react';
import { getPokemonInfo} from '../../Api';
import Pokemon from '../pokemon/Pokemon';
import PokemonDetails from "../pokemonDetails/PokemonDetails";


const PokemonList = ({ loadPokemons, pokemons, pokemonsInfo, setPokemonsInfo, selectedPokemon, serverInfo, setSelectedPokemon, pokemonTypes, loadPokemonTypes, filteredPokemons, setFilterQuery, filterPokemons }) => {
  const loadPokemonsInfo = async (pokemons) => {
    const pokemonsInfo = await Promise.all(pokemons.map(item => getPokemonInfo(item.url)));

    setPokemonsInfo(pokemonsInfo);
    filterPokemons();
  };

  //component did mount
  useEffect(() => {
    loadPokemons('https://pokeapi.co/api/v2/pokemon/?limit=12');
    loadPokemonTypes('https://pokeapi.co/api/v2/type?limit=999');
  }, []);

  //component did update
  useEffect(() => {
    if (!pokemons.length) return;

    loadPokemonsInfo(pokemons);

  }, [pokemons]);

  const loadMoreClick = (event) => {
    setPokemonsInfo(null);
    setSelectedPokemon(null);

    loadPokemons(serverInfo.next);
  };

  const getSelectOptions = (pokemonTypes) => {
    if (!pokemonTypes) return;
    const types = pokemonTypes.results;

    return types.map(({ name }) => ({ value: name, text: name }))
  };

  const changeFilterQuery = (event) => {
    setFilterQuery(event.target.textContent);
    filterPokemons();
  };

  return (
    <>
      <div className="select">
        <Select placeholder='Filter by types...' options={getSelectOptions(pokemonTypes) || []} onChange={changeFilterQuery} />
      </div>
      <section className="pokemonsSection">
        {pokemonsInfo ? (
          <>
            <div className="pokemonList">
              {(filteredPokemons || pokemonsInfo).map(pokemonInfo => <Pokemon key={pokemonInfo.name} pokemonInfo={pokemonInfo} />)}
            </div>
            {selectedPokemon && <PokemonDetails pokemonInfo={pokemonsInfo.find(item => item.name === selectedPokemon)} />}
          </>
        ) : (
          <div className="loading">
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
          </div>
        )}
      </section>
      <button className="loadMore" onClick={loadMoreClick}>Load More</button>
    </>
  );
};

const mapStateToProps = state => ({
  pokemons: getPokemons(state),
  pokemonsInfo: getPokemonsInfo(state),
  selectedPokemon: getSelectedPokemon(state),
  serverInfo: getSeverInfo(state),
  pokemonTypes: getPokemonTypes(state),
  filteredPokemons: getFilteredPokemons(state),
});

const mapDispatchToProps = dispatch => ({
  loadPokemons: (url) => dispatch(loadPokemons(url)),
  setPokemonsInfo: pokemonsInfo => dispatch(setPokemonsInfo(pokemonsInfo)),
  setSelectedPokemon: (name) => dispatch(setSelectedPokemon(name)),
  loadPokemonTypes: (url) => dispatch(loadPokemonTypes(url)),
  setFilterQuery: (filterQuery) => dispatch(setFilterQuery(filterQuery)),
  filterPokemons: () => dispatch(filterPokemons()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonList);
