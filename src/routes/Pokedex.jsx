import { useState, useEffect } from 'react';

import Input from '../components/input';
import Info from '../components/info';

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

  const [searchSuccessful, setSearchSuccessful] = useState(false);

  // Función para reiniciar el contador
  const resetCounter = () => {
    setCounter(secs);
  };

  // Cambio de estados del timer hasta llegar a 0 y reiniciar
  useEffect(() => {
    const timer =
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0 && searchSuccessful) {
      const randomId = Math.floor(Math.random() * 806 + 1);
      setPokemonId(randomId);
      resetCounter();
    }

    return () => clearTimeout(timer);
  }, [counter, searchSuccessful]);

  // Fetch de la api para obtener la respuesta o el error
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPokemon(data);
          setLoading(false);
          resetCounter();
          setSearchSuccessful(true);
        } else {
          setLoading(false);
          setSearchSuccessful(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSearchSuccessful(false);
      });
  }, [pokemonID]);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="container">
      <div className="container text-center">
        <h1>Pokedéx</h1>
      </div>
      <Input
        setPokemonId={setPokemonId}
        onSearch={() => setSearchSuccessful(true)}
      />
      <Info pokemon={pokemon} />
      <h1>{counter}</h1>
    </div>
  );
};

export default Pokedex;
