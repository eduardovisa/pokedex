import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

const Historial = ({ pokemonID }) => {
  // Variables usadas para determinar el estado del fetch y guardar la data obtenida
  const [pokemones, setPokemones] = useState(null);

  // Fetch de la api para obtener la respuesta o el error
  async function getPokemones() {
    const response = await fetch(
      'https://anacardiaceous-surg.000webhostapp.com/api/pokemones'
    );
    const pokemonesData = await response.json();
    setPokemones(pokemonesData);
  }

  useEffect(() => {
    getPokemones();
  }, [pokemonID]);

  return (
    <div style={{ color: 'black' }}>
      <div>Hola</div>
    </div>
  );
};

Historial.propTypes = {
  pokemonID: PropTypes.number.isRequired,
};

export default Historial;
