import { useState, useEffect } from 'react';

import Input from '../components/input';
import Info from '../components/info';

import { randomNumber } from '../functions';

// Indicador de segundos para cambio de Pokemón
const secs = 30;

const Pokedex = () => {
  // Estado del contador indicando el segundo actual
  const [counter, setCounter] = useState(secs);

  // Variables usadas para determinar el estado del fetch y guardar la data obtenida
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonID, setPokemonId] = useState(randomNumber);

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
      setPokemonId(randomNumber);
      resetCounter();
      setSearchSuccessful(false);
    } else if (counter === 0) {
      setPokemonId(randomNumber);
      resetCounter();
      setSearchSuccessful(false);
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
    <div className="container text-center">
      <div className="row d-flex align-items-center mb-4">
        <div className="col-lg-8 col-md-12">
          <img
            className="my-4"
            width="20%"
            src="https://cdn-icons-png.flaticon.com/256/287/287221.png"
            alt=""
          />
          <h1>Pokedex</h1>
        </div>
        <div className="col-lg-4 col-md-12 d-flex align-items-center h-100 justify-content-center">
          <i className="bi bi-clock">
            <h4>{counter}</h4>
          </i>
        </div>
      </div>
      <Input
        setPokemonId={setPokemonId}
        onSearch={() => setSearchSuccessful(true)}
      />
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <button
              style={{ backgroundColor: '#FFC107', borderRadius: 10 }}
              className="btn"
              type="button"
              id="button-changePokemon"
              onClick={() => setPokemonId(randomNumber)}
            >
              Aleatorio
            </button>
          </div>
          {/* <div className="col">
            <button
              style={{ backgroundColor: 'pink', borderRadius: 0 }}
              className="btn"
              type="button"
              id="button-changePokemon"
              onClick={() => setPokemonId(randomNumber)}
            >
              <i className="bi bi-suit-heart-fill" style={{ color: 'red' }}></i>
            </button>
          </div>
          <div className="col">
            <button
              style={{ backgroundColor: 'pink', borderRadius: 0 }}
              className="btn"
              type="button"
              id="button-changePokemon"
              onClick={() => setPokemonId(randomNumber)}
            >
              Guardar
            </button>
          </div> */}
        </div>
      </div>

      <Info pokemon={pokemon} />
    </div>
  );
};

export default Pokedex;
