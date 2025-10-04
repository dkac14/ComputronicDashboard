import React, { useState } from "react";

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    onResults(data);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar publicaciones NASA..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
