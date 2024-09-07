'use client';

import React, { useState } from 'react';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import api from '@/app/api/api'; // Asegúrate de importar tu cliente API

interface BarCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Hacemos que imageUrl sea opcional, porque lo definimos basado en el tipo
  operatingHours: string;
  isOwner: boolean; // Añadimos esta prop para saber si el usuario es el dueño
  type: 'bar' | 'restaurant' | 'cafe' | 'bistro'; // Definimos explícitamente los tipos de establecimiento
}

const BarCard: React.FC<BarCardProps> = ({ id, name, description, operatingHours, isOwner, type }) => {
  const [showConfirm, setShowConfirm] = useState(false); // Estado para controlar la visibilidad del pop-up

  // Definir el path de la imagen basado en el tipo (sin 'public' en la ruta)
  const imagePath = `/${type}.jpg`;

  const handleCardClick = () => {
    window.location.href = `/e/${id}`;
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se dispare handleCardClick
    window.location.href = `/e/${id}/edit`; // Redirigir a la página de edición
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se dispare handleCardClick
    setShowConfirm(true); // Mostrar el pop-up de confirmación
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/establishments/${id}`);
      window.location.reload(); // Recargar la página para reflejar los cambios
    } catch (error) {
      console.error('Error deleting establishment:', error);
    }
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que el clic se propague al div que está detrás
    setShowConfirm(false); // Ocultar el pop-up de confirmación
  };

  return (
    <div className="max-w-sm rounded border overflow-hidden shadow-lg m-4 cursor-pointer" onClick={handleCardClick}>
      {/* Renderizamos la imagen basada en el tipo */}
      <img className="w-full" src={imagePath} alt={`Imagen de ${type}`} />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-sm text-gray-600">{operatingHours}</div>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
        {isOwner && (
          <div className="flex space-x-2 mt-2">
            <button
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={handleEditClick}
            >
              <Pencil1Icon className="mr-2" />
              Editar
            </button>
            <button
              className="text-red-500 hover:text-red-700 flex items-center"
              onClick={handleDeleteClick}
            >
              <TrashIcon className="mr-2" />
              Eliminar
            </button>
          </div>
        )}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">¿Estás seguro de que deseas eliminar este establecimiento?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCancelClick}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarCard;
