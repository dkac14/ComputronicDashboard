import React, { useState, useEffect } from 'react';
const WelcomeGate = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const handleUnlock = () => {
    setIsUnlocked(true);
  };
  useEffect(() => {
    if (isUnlocked) {
      return;
    }
    const handleDocumentClick = () => {
      handleUnlock();
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isUnlocked]);
  if (!isUnlocked) {
    return (
      <div 
        className="welcome-gate-overlay"
      >
        <div className="circle-blue"></div> 
        <div className="circle-blue-sm"></div>    
        <div className="circle-red-lg"></div>    
        <div className="circle-green-md"></div> 
        <div className="welcome-gate-card">
          <h1>Bienvenido al portal</h1>
          <p></p>
        </div>
      </div>
    );
  }
  return (
    <div className="unlocked-content">
      {children}
    </div>
  );
};

export default WelcomeGate;