// src/InfoBox.jsx
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, children }) {
  return (
    <div className="info-box">
      <h3 className="info-title">{title}</h3>
      <div className="info-content">
        {children ? children : <p>Aquí puedes agregar información más adelante...</p>}
      </div>
    </div>
  );
}

export default InfoBox;
