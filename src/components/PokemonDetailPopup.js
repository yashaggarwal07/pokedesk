import React from 'react';

const PokemonDetailPopup = (props) => {
    const {pokemon} = props
 return (
    <div>
          <div className="pokemon-img-container">
                <img
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                    alt={props.name}
                    className="pokemon-img"
                />
            </div>
            <div className="card-body">
                <div className="card-top">
                    <h3>{pokemon.name}</h3>
                </div>
                </div>
    </div>
  )
}

export default PokemonDetailPopup