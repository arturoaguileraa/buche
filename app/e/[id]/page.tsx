'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/productcard';
import BackButton from '@/components/ui/backbutton';
import { Button } from '@/components/ui/button';
import api from '@/app/api/api';

interface Product {
  id: string;
  name: string;
  description: string;
  currentPrice: number;
  availability: boolean;
  categoryId: string;
}

interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

interface Establishment {
  id: string;
  name: string;
  address: string;
  phone: string;
  type: string;
  capacity: number;
  operatingHours: string;
  email: string;
  website: string;
  description: string;
}

// Datos de ejemplo para categorías y productos
const productCategories: ProductCategory[] = [
  { id: '1', name: 'Entrantes' },
  { id: '2', name: 'Platos principales' },
  { id: '3', name: 'Postres' },
  { id: '4', name: 'Bebidas' },
];

const products: Product[] = [
  { id: '1', name: 'Ensalada César', description: 'Lechuga, pollo, parmesano y aderezo César', currentPrice: 7.50, availability: true, categoryId: '1' },
  { id: '2', name: 'Pizza Margarita', description: 'Tomate, mozzarella y albahaca', currentPrice: 10.00, availability: true, categoryId: '2' },
  { id: '3', name: 'Brownie de chocolate', description: 'Brownie con helado de vainilla', currentPrice: 5.00, availability: false, categoryId: '3' },
  { id: '4', name: 'Jugo de Naranja', description: 'Jugo de naranja natural', currentPrice: 3.00, availability: true, categoryId: '4' },
];

const EstablishmentPage: React.FC = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(productCategories[0].id);
  const [establishment, setEstablishment] = useState<Establishment | null>(null);

  useEffect(() => {
    // Fetch the establishment data from the backend
    const fetchEstablishmentData = async () => {
      try {
        const response = await api.get(`/establishments/${id}`);
        setEstablishment(response.data);
      } catch (error) {
        console.error('Error fetching establishment data:', error);
      }
    };

    fetchEstablishmentData();
  }, [id]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = products.filter(product => product.categoryId === selectedCategory);

  const handleAddProduct = () => {
    window.location.href += '/add-product';
  };

  return (
    <div className="container mx-auto py-8">
      <div className='flex w-full justify-between'>
        <BackButton></BackButton>
        <Button onClick={handleAddProduct}>+ Añadir producto</Button>
      </div>
      {establishment && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{establishment.name}</h1>
          <p><strong>Dirección:</strong> {establishment.address}</p>
          <p><strong>Teléfono:</strong> {establishment.phone}</p>
          <p><strong>Tipo:</strong> {establishment.type}</p>
          <p><strong>Capacidad:</strong> {establishment.capacity}</p>
          <p><strong>Horario de operación:</strong> {establishment.operatingHours}</p>
          <p><strong>Email:</strong> {establishment.email}</p>
          <p><strong>Sitio web:</strong> <a href={establishment.website} target="_blank" rel="noopener noreferrer">{establishment.website}</a></p>
          <p><strong>Descripción:</strong> {establishment.description}</p>
        </div>
      )}

      <div className="flex space-x-4 mb-8 border-b pb-4">
        {productCategories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            currentPrice={product.currentPrice}
            availability={product.availability}
          />
        ))}
      </div>
    </div>
  );
};

export default EstablishmentPage;
