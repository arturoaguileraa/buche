'use client';

import React from 'react';
import { Pencil1Icon } from '@radix-ui/react-icons';

interface BarCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  operatingHours: string;
  isOwner: boolean;  // Añadimos esta prop para saber si el usuario es el dueño
}

const BarCard: React.FC<BarCardProps> = ({ id, name, description, imageUrl, operatingHours, isOwner }) => {
  const handleCardClick = () => {
    window.location.href = `/e/${id}`;
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se dispare handleCardClick
    window.location.href = `/e/${id}/edit`; // Redirigir a la página de edición
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer"
      onClick={handleCardClick}
    >
      <img className="w-full" src={imageUrl} alt={`Imagen de ${name}`} />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-sm text-gray-600">{operatingHours}</div>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
        {isOwner && (
          <button
            className="mt-2 text-blue-500 hover:text-blue-700 flex items-center"
            onClick={handleEditClick}
          >
            <Pencil1Icon className="mr-2" />
            Editar
          </button>
        )}
      </div>
    </div>
  );
};

export default BarCard;
