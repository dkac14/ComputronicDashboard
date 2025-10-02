
import React, { useEffect } from 'react';
const WelcomeGate = ({ onUnlock, children }) => {
  const handleDocumentClick = () => {
    onUnlock(); 
  };
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []); 

  return (
    <div className="welcome-gate-overlay">
      <div className="circle-blue"></div> 
      <div className="circle-green"></div>   
      <div className="circle-purple"></div>  
      <div className="circle-blue-sm"></div>    
      <div className="circle-red-lg"></div>     
      <div className="circle-green-md"></div>  
      <div className="welcome-gate-card">
        <h1> Bienvenido al portal</h1>
      </div>
    </div>
  );
};

export default WelcomeGate;