'use client';

import React, { useState } from 'react';
import api from '../api/api';
import { Button } from '@/components/ui/button';

const AddProductForm: React.FC<{ establishmentId: string }> = ({ establishmentId }) => {
  const [name, setName] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState(true);
  const [category, setCategory] = useState('');

  const productCategories = [
    { id: '1', name: 'Entrantes' },
    { id: '2', name: 'Platos principales' },
    { id: '3', name: 'Postres' },
    { id: '4', name: 'Bebidas' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProduct = {
        name,
        currentPrice: parseFloat(currentPrice),
        description,
        availability,
        categoryId: category,
        establishmentId,
      };
      const response = await api.post('/products', newProduct);
      if (response.status === 201) {
        alert('Producto añadido con éxito');
        // Puedes redirigir o limpiar el formulario aquí si lo deseas
      }
    } catch (error) {
      console.error('Error al añadir producto:', error);
      alert('Hubo un error al añadir el producto');
    }
  };

  const handleCancel = () => {
    window.location.href = '/home'
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Añadir Producto</h2>

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
        <label className="block text-gray-700 text-sm font-bold mb-2">Precio Actual</label>
        <input
          type="number"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
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

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Disponibilidad</label>
        <select
          value={availability ? 'Disponible' : 'No disponible'}
          onChange={(e) => setAvailability(e.target.value === 'Disponible')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="Disponible">Disponible</option>
          <option value="No disponible">No disponible</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Selecciona una categoría</option>
          {productCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-around'>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Añadir Producto
      </button>
      <Button variant="destructive" onClick={handleCancel}> Cancelar </Button>
      
      </div>
    </form>
  );
};

export default AddProductForm;
