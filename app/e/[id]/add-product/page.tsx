'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import api from '@/app/api/api';
import { useParams } from 'next/navigation';
import CategoryModal from '@/components/ui/Modal';

interface ProductCategory {
  id: number;
  name: string;
  description: string;
}

const AddProductForm: React.FC = () => {
    const { id: establishmentId } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState(true);
  const [category, setCategory] = useState('');
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/product-categories/${establishmentId}`);
        setProductCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, [establishmentId]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'add-category') {
      setIsModalOpen(true);
    } else {
      setCategory(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const newProduct = {
            name,
            price: parseFloat(currentPrice),
            description,
            availability,
            categoryId: parseInt(category),
            establishmentId: parseInt(establishmentId),
        };  
        
      const response = await api.post('/products', newProduct);
      if (response.status === 201) {
        alert('Producto añadido con éxito');
        window.location.href = `/e/${establishmentId}`;
      }
    } catch (error) {
      console.error('Error al añadir producto:', error);
      alert('Hubo un error al añadir el producto');
    }
  };

  const handleCancel = () => {
    window.location.href = '/home';
  };

  return (
    <>
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
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="">Selecciona una categoría</option>
            {productCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
            <option value="add-category">+ Añadir Categoría</option>
          </select>
        </div>

        <div className="flex justify-around">
          <Button variant="destructive" onClick={handleCancel}> Cancelar </Button>
          
          <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
              Añadir Producto
          </button>
        </div>
      </form>

      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          onSave={(newCategory) => setProductCategories([...productCategories, newCategory])}
          establishmentId={establishmentId}
        />
      )}
    </>
  );
};

export default AddProductForm;
