// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import WelcomeGate from './WelcomeGate';
import SearchBar from './SearchBar';
import InfoBox from './InfoBox';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [results, setResults] = useState([]);

  const handleUnlock = () => setIsUnlocked(true);

  return (
    <div className="App">
      {!isUnlocked ? (
        <WelcomeGate onUnlock={handleUnlock} />
      ) : (
        <>
          <SearchBar onResults={setResults} />
          <header className="Unlocked-Header">
            <h2>Lo destacado del día</h2>
          </header>

          {/* 👇 Resultados en "cuadritos" */}
          {results.length > 0 &&
            results.map((r, idx) => (
              <InfoBox key={idx} title={r.title}>
                <p>{r.summary}</p>
              </InfoBox>
            ))}
        </>
      )}
    </div>
  );
}

export default App;
