import { useState, useEffect } from 'react';
import Input from '../components/input';

// Indicador de segundos para cambio de Pokemón
const secs = 10;

const Pokedex = () => {
  // Estado del contador indicando el segundo actual
  const [counter, setCounter] = useState(secs);

  // Número random de ID con función Math
  const randomID = Math.floor(Math.random() * 806 + 1);
  // Variables usadas para determinar el estado del fetch y guardar la data obtenida
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonID, setPokemonId] = useState(randomID);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    const interval = setInterval(() => {
      const RandomId = Math.floor(Math.random() * 806 + 1);
      setPokemonId(RandomId);
    }, 10000);

    return () => clearInterval(interval);
  }, [pokemonID]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
        setCounter(secs);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [pokemonID]);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <section>
      <h1>Pokedéx</h1>
      <Input />
      <h3>{pokemon.name}</h3>
      <h1>{counter}</h1>
    </section>
  );
};

export default Pokedex;
