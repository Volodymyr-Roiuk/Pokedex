import React from 'react';
import './PokemonDetails.css';

const getId = (id) => {
  id = id.toString();

  if (id.length === 1) return `00${id}`;
  else if (id.length === 2) return `0${id}`;
  else
    return id;
};

const getStatName = (name) => {
  switch (name) {
    case 'attack':
      return 'Attack';
    case 'defense':
      return 'Defense';
    case 'hp':
      return 'Hp';
    case 'special-attack':
      return 'SP Attack';
    case 'special-defense':
      return 'SP defence';
    case 'speed':
      return 'Speed';
    default:
      return name;
  }
};

const PokemonDetails = ({ pokemonInfo: { id, name, sprites, stats } }) => {
  stats.sort((a, b) => a.stat.name.localeCompare(b.stat.name));

  return (
    <div className="details">
      <img className="details__img" src={sprites.front_default} />
      <h2 className="details__name">
        {`${name.charAt(0).toUpperCase() + name.slice(1)} #${getId(id)}`}
      </h2>
      <table className="details__table">
        <thead>
          <tr>
            <th className="table__col">Type</th>
            <th className="table__col">Fire</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(itemStat => (
            <tr key={itemStat.stat.name}>
              <td className="table__col">{getStatName(itemStat.stat.name)}</td>
              <td className="table__col">{itemStat.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDetails;
