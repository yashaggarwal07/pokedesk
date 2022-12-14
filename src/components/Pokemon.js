import React, { useContext } from "react";
import { useState } from "react";
import PokemonDetailPopup from './PokemonDetailPopup'

const Pokemon = (props) => {
    const { pokemon } = props;
    const [pokemons, openPokemon] = useState([]);
    const [cardClicked, setCardClick] = useState(false);

    const onClick = async (e) => {
        openPokemon(pokemon);
        setCardClick(true)
    };
    return (
        <div>
            <div className="pokemon-card" onClick={onClick}>
                <div className="pokemon-img-container">
                    <img
                        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        alt={pokemon.name}
                        className="pokemon-img"
                    />
                </div>
                <div className="card-body">
                    <div className="card-top">
                        <h3>{pokemon.name}</h3>
                        <div>#{pokemon.id}</div>
                    </div>
                    <div className="card-bottom">
                        <div className="pokemon-type">
                            {pokemon.types.map((type, idx) => {
                                return (
                                    <div key={idx} className="pokemon-type-text">
                                        {type.type.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {cardClicked ?
                <><PokemonDetailPopup
                    pokemon={pokemons} />
                </>
                : <div></div>
            }
        </div>
    );
};

export default Pokemon;
