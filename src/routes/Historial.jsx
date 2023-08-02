import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Historial = ({ pokemonID }) => {
  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(true);

  async function deletePokemones() {
    const response = await fetch(
      'https://pokedex.cursospremed.com/api/delete',
      { method: 'DELETE' }
    );
    const pokemonesData = await response.json();
    setPokemones(pokemonesData);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokedex.cursospremed.com/api/pokemones?id_lte=${pokemonID}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemones(data.pokemones);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [pokemonID]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ color: 'black' }}>
      <div>
        <button
          style={{ backgroundColor: '#FFC107', borderRadius: 10 }}
          className="btn"
          type="button"
          id="button-changePokemon"
          onClick={deletePokemones}
        >
          Borrar historial
        </button>
      </div>
      <div className="container mt-4">
        <div className="row">
          {pokemones.length > 0 ? (
            pokemones.map((pokemon, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-2 col-md-3 col-sm-6 col-6 mb-4"
                >
                  <div className="card">
                    <img
                      src={pokemon.imagen}
                      alt={pokemon.name}
                      className="img-pokemon"
                      style={{ maxWidth: '100%' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pokemon.nombre}</h5>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No hay pokemones</div>
          )}
        </div>
      </div>
    </div>
  );
};

Historial.propTypes = {
  pokemonID: PropTypes.number.isRequired,
};

export default Historial;
