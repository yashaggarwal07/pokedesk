import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import PokemonListing from './components/PokemonListing'
import Searchbar from './components/Searchbar'
import { useState, useEffect } from 'react';
import { getPokemonData, getPokemons, searchPokemon } from "./api";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);


  const fetchPokemons = async () => {
    try {
      const data = await getPokemons(20, 20 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false);
    } catch (err) { }
  };
  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);
  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setSearching(false);
  };
  return (
    <div className="App">
      <NavBar />
      <div className="App">
        <Searchbar onSearch={onSearch} />
        {notFound ? (
          <div className="not-found-text">
            No Pokemon found !
          </div>
        ) : (
          <PokemonListing
            pokemons={pokemons}
            page={page}
            setPage={setPage}
            total={total}
          />
        )}
      </div>
    </div>
  );
}

export default App;
