import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import api from '@/app/api/api';

interface CategoryModalProps {
  onClose: () => void;
  onSave: (newCategory: any) => void;
  establishmentId: string;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ onClose, onSave, establishmentId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    try {
      const response = await api.post('/product-categories', {
        name,
        description,
        establishmentId: parseInt(establishmentId), // Asegúrate de que establishmentId sea un número
      });
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Hubo un error al añadir la categoría');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Añadir Categoría</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} className="ml-4">Guardar</Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
