import React, { useState } from 'react'; 
import './App.css';
import WelcomeGate from './WelcomeGate';
import SearchBar from './SearchBar';
import InfoBox from './InfoBox'; // 👈 nuevo

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <div className="App"> 
      {!isUnlocked ? (
        <WelcomeGate onUnlock={handleUnlock}>
          <header className="App-header">
            <h2>Lo destacado del día</h2>
          </header>
        </WelcomeGate>
      ) : (
        <>
          <SearchBar />

          <header className="Unlocked-Header">
            <h2>Lo destacado del día</h2>
          </header>

          {/* 👇 Cuadro de información */}
          <InfoBox title="Información destacada">
            <p>Aquí podrás agregar información más adelante (notas, recordatorios, KPIs, etc.).</p>
          </InfoBox>
        </>
      )}
    </div>
  );
}

export default App;
