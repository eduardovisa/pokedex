import './App.css';
import Pokedex from './routes/Pokedex';

function App() {
  return (
    <div
      style={{
        backgroundColor: '#04B2D9',
        paddingLeft: '8vh',
        paddingRight: '8vh',
        paddingBottom: '2vh',
        borderRadius: 10,
      }}
    >
      <Pokedex />
    </div>
  );
}

export default App;
