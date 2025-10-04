import React, { useState } from "react";
import SearchBar from "./SearchBar";
import InfoBox from "./InfoBox";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <SearchBar onResults={setResults} />
      <header className="Unlocked-Header">
        <h2>Lo destacado del día</h2>
      </header>

      {results.length > 0 && results.map((r, idx) => (
        <InfoBox key={idx} title={r.title}>
          <p>{r.summary}</p>
        </InfoBox>
      ))}
    </div>
  );
}

export default App;
