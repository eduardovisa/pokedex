import React, { useState, useEffect } from 'react';
import Input from '../components/input';
import Info from '../components/info';
import { randomNumber } from '../functions';
import Historial from './Historial';

// Indicador de segundos para cambio de Pokémon
const secs = 30;

const Pokedex = () => {
  // Estado del contador indicando el segundo actual
  const [counter, setCounter] = useState(secs);

  // Variables usadas para determinar el estado del fetch y guardar la data obtenida
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonID, setPokemonId] = useState(randomNumber);
  const [lastPokemonID, setLastPokemonID] = useState(null); // Nuevo estado
  const [searchSuccessful, setSearchSuccessful] = useState(false);

  // Función para reiniciar el contador
  const resetCounter = () => {
    setCounter(secs);
  };

  // Función para manejar el click del botón "Historial"
  const handleHistorialClick = () => {
    // Configuramos el estado de lastPokemonID con el valor actual de pokemonID
    setLastPokemonID(pokemonID);
  };

  const postPokemon = async (pokemonData) => {
    try {
      const response = await fetch(
        'https://pokedex.cursospremed.com/api/index',
        {
          method: 'POST',
          body: JSON.stringify(pokemonData),
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post Pokemon data');
      }
    } catch (error) {
      console.error(error);
    }
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
  }, [counter, pokemon, searchSuccessful]);

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

  // Llamamos al método postPokemon solo cuando cambia el estado de pokemon (cuando se obtiene un nuevo Pokémon)
  useEffect(() => {
    if (pokemon) {
      postPokemon({
        nombre: pokemon.name ? pokemon.name : '',
        imagen: pokemon.sprites?.front_default
          ? pokemon.sprites.front_default
          : '',
        valor: pokemon.id ? pokemon.id.toString() : '',
      });
    }
  }, [pokemon]);

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
        <div className="row gap-1">
          <div className="col">
            <button
              style={{ backgroundColor: '#FFC107', borderRadius: 10 }}
              className="btn"
              type="button"
              id="button-changePokemon"
              onClick={() => {
                setPokemonId(randomNumber);
                setLastPokemonID(pokemonID);
              }}
            >
              Mostrar Pokemón
            </button>
          </div>
          <div className="col-12">
            <button
              data-bs-target="#modalHistorial"
              data-bs-toggle="modal"
              style={{ backgroundColor: '#FFC107', borderRadius: 10 }}
              className="btn"
              type="button"
              id="button-changePokemon"
              onClick={handleHistorialClick}
            >
              Mostrar Pokemón Guardados
            </button>
          </div>

          <div
            className="modal fade"
            id="modalHistorial"
            aria-hidden="true"
            aria-labelledby="modalToggleLabel"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id="exampleModalToggleLabel"
                    style={{ color: 'black' }}
                  >
                    Pokemón Guardados
                  </h1>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cerrar
                  </button>
                </div>
                <div className="modal-body">
                  <Historial pokemonID={parseInt(lastPokemonID)} />
                </div>
              </div>
            </div>
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
