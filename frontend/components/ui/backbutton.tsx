import React from 'react';

const BackButton: React.FC = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <button 
      onClick={handleBackClick}
      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 ml-2 mr-2"
    >
      Volver
    </button>
  );
};

export default BackButton;