import React from 'react';
import './Pokemon.css';
import { connect } from 'react-redux';
import { setSelectedPokemon } from '../../store';



const setSpritesClass = (sprite) => {
  switch (sprite) {
    case 'grass':
      return 'pokemon__sprite grass';
    case 'poison':
      return 'pokemon__sprite poison';
    case 'electric':
      return 'pokemon__sprite electric';
    case 'fire':
      return 'pokemon__sprite fire';
    case 'flying':
      return 'pokemon__sprite flying';
    case 'water':
      return 'pokemon__sprite water';
    case 'bug':
      return 'pokemon__sprite bug';
    case 'ground':
      return 'pokemon__sprite ground';
    case 'fairy':
      return 'pokemon__sprite fairy';
    default:
      return 'pokemon__sprite default';
  }
};

const Pokemon = ({ pokemonInfo: { name, sprites, types }, setSelectedPokemon }) => {
  const pokemonClick = (event) => {
    setSelectedPokemon(event.currentTarget.dataset.name);
  };

  if (types.length > 1) {
    types.sort((a, b) => a.slot - b.slot);
  }

  return (
    <div className="pokemon" data-name={name} onClick={pokemonClick}>
      <img className="pokemon__img" src={sprites.front_default} />
      <h3 className="pokemon__name">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div className="pokemon__sprites">
        {types.map(item => (
          <div
            className={setSpritesClass(item.type.name)}
            key={item.type.name}
          >
            {item.type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
  setSelectedPokemon: name => dispatch(setSelectedPokemon(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemon);
