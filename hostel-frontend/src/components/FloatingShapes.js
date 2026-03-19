import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="floating-shapes-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="shape"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 15 + 15}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
