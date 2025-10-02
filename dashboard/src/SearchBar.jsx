import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input 
        type="text" 
        placeholder="Buscar contenido..." 
        className="search-input"
      />
      <button className="search-button">🔍</button>
    </div>
  );
};

export default SearchBar;