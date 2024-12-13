import React from 'react';

interface LoaderProps {
  message?: string; // Prop opcional para el mensaje
}

const Loader: React.FC<LoaderProps> = ({ message = "Cargando..." }) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <span className="loader"></span>
      <p className="mt-3">{message}</p>
    </div>
  );
}

export default Loader;