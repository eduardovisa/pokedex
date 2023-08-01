const Input = () => {
  return (
    <div className="input-group mb-4 mt-4">
      <span className="input-group-text" id="basic-addon1">
        ID / Nombre
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Pikachu"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
      >
        Buscar
      </button>
    </div>
  );
};

export default Input;
