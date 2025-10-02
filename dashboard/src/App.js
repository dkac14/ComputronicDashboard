import React, { useState } from 'react'; 
import './App.css';
import WelcomeGate from './WelcomeGate';
import SearchBar from './SearchBar'; 

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <div className="App"> 
      {isUnlocked && <SearchBar />} 
      {!isUnlocked ? (
        <WelcomeGate onUnlock={handleUnlock}>
          <header className="App-header">
          <h2>Lo destacado del dia</h2>
          </header>
        </WelcomeGate>
      ) : (
        <header className="Unlocked-Header">
        <h2>Lo destacado del dia</h2>
        </header>
      )}
    </div>
  );
}

export default App;