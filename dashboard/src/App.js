import './App.css';
import WelcomeGate from './WelcomeGate';

function App() {
  return (
    <div className="App"> 
      <WelcomeGate>
        <header className="App-header">
          <h1>Contenido Exclusivo</h1>
          <p>¡Has desbloqueado el contenido exclusivo de la web!</p>
        </header>
      </WelcomeGate>  
    </div>
  );
}
export default App;

