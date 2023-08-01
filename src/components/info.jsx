import PropTypes from 'prop-types';

import 'bootstrap-icons/font/bootstrap-icons.css';

import { capitalizeWord } from '../functions';

const acordion = (children, title) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${title}`}
          aria-expanded="true"
          aria-controls={title}
        >
          Estadísticas
        </button>
      </h2>
      <div
        id={title}
        className="accordion-collapse collapse show"
        data-bs-parent="#accordionInfo"
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};

const Info = ({ pokemon }) => {
  return (
    <div className="container">
      <div className="row d-flex align-items-center mb-4">
        <div className="col-lg-4 col-md-12">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="img-pokemon"
          />
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="container">
            <div className="row flex-column">
              <div className="col">
                <h1>{capitalizeWord(pokemon.name)}</h1>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion" id="accordionInfo">
        {acordion(
          <ul className="list-group list-group-flush">
            <li className="list-group-item list-group-item-action">
              <i className="bi bi-suit-heart-fill" style={{ color: 'red' }}>
                {' HP '}
                {pokemon.stats[0].base_stat}
              </i>
            </li>
            <li className="list-group-item list-group-item-action">
              <i className="bi bi bi-heartbreak" style={{ color: 'grey' }}>
                {' Ataque '}
                {pokemon.stats[0].base_stat}
              </i>
            </li>
            <li className="list-group-item list-group-item-action">
              <i className="bi bi-shield-fill" style={{ color: 'black' }}>
                {' Defensa '}
                {pokemon.stats[0].base_stat}
              </i>
            </li>
          </ul>,
          'collapseOne'
        )}
        {acordion(
          <ul className="list-group list-group-flush">
            {pokemon.abilities.map((habilidad, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                >
                  <i
                    className="bi bi-chevron-double-up"
                    style={{ color: '#FFC107' }}
                  ></i>{' '}
                  {capitalizeWord(habilidad.ability.name)}
                </li>
              );
            })}
          </ul>,
          'collapseTwo'
        )}
      </div>
    </div>
  );
};

Info.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default Info;
