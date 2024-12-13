import React from 'react';
import backgroundImage from '@/public/background.jpg';
import SessionButton from '@/components/ui/SessionButton';

const Signin = () => {
  return (
    <div
      className="flex flex-col min-h-screen justify-center items-center bg-center"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'contain', // Cambiamos 'cover' por 'contain' para evitar la ampliación excesiva
      }}
    >
      <div className="font-comfortaa text-6xl">buche</div>
      <p className="text-white text-lg mb-4 font-extrabold">serve fast, live more.</p>
      <SessionButton />
    </div>
  );
};

export default Signin;
