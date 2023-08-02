import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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
    fetch('https://pokedex.cursospremed.com/api/pokemones')
      .then((res) => res.json())
      .then((data) => {
        setPokemones(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []); // Aquí usamos un arreglo de dependencias vacío

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
                  className="col-lg-2 col-md-3 col-sm-6 col-12 mb-4"
                >
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={pokemon.imagen}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pokemon.nombre}</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
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
