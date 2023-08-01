import PropTypes from 'prop-types';

import { useState } from 'react';

const Input = ({ setPokemonId, onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    setPokemonId(inputValue.toLowerCase());
    onSearch();
    setInputValue('');
  };

  return (
    <div className="container input-group mb-4 mt-4 flex-column flex-md-row d-flex justify-content-center align-items-center">
      <span
        className="input-group-text mb-2 mb-md-0 order-md-0 d-md-flex align-items-center justify-content-center"
        id="basic-addon1"
        style={{ fontWeight: 'bold' }}
      >
        ID / Nombre
      </span>
      <div className="d-flex flex-column flex-md-row">
        <input
          type="text"
          className="form-control mb-md-0"
          placeholder="Pikachu"
          aria-label="Username"
          aria-describedby="basic-addon1"
          style={{ borderRadius: 0 }}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          style={{ backgroundColor: '#FFC107', borderRadius: 0 }}
          className="btn"
          type="button"
          id="button-changePokemon"
          onClick={handleSearchClick}
          disabled={inputValue.length <= 0}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

Input.propTypes = {
  setPokemonId: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Input;
