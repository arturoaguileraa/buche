'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/productcard';
import BackButton from '@/components/ui/backbutton';
import { Button } from '@/components/ui/button';
import api from '@/app/api/api';
import { useProfileData } from '@/app/utils/jwtUtils';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  category: { id: number};
}

interface ProductCategory {
  id: number;
  name: string;
  description?: string;
}

interface Establishment {
  id: number;
  name: string;
  address: string;
  phone: string;
  type: string;
  capacity: number;
  operatingHours: string;
  email: string;
  website: string;
  description: string;
  owner: {id:string}
}

const EstablishmentPage: React.FC = () => {
  const profileData = useProfileData();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const canEditOrAddProduct = profileData?.roles === 'ADMIN' || (profileData?.roles === 'OWNER' && establishment?.owner.id === profileData.id);

  
  useEffect(() => {
    const fetchEstablishmentData = async () => {
      try {
        const response = await api.get(`/establishments/${id}`);
        setEstablishment(response.data);
      } catch (error) {
        console.error('Error fetching establishment data:', error);
      }
    };

    const fetchProductCategories = async () => {
      try {
        const response = await api.get(`/product-categories/${id}`);
        setProductCategories(response.data);
        setSelectedCategory(response.data[0]?.id || '');
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products/establishment/${id}`);
        setProducts(response.data);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchEstablishmentData();
    fetchProductCategories();
    fetchProducts();
  }, [id]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleAddProduct = () => {
    window.location.href = `/e/${id}/add-product`;
  };

  const handleEditEstablishment = () => {
    window.location.href = `/e/${id}/edit`;
  };
  const filteredProducts = products.filter(product => product.category.id === selectedCategory);
  

  return (
    <div className="container mx-auto py-8">
      {establishment && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{establishment.name}</h1>
          <p><strong>Dirección:</strong> {establishment.address}</p>
          <p><strong>Teléfono:</strong> {establishment.phone}</p>
          <p><strong>Tipo:</strong> {establishment.type}</p>
          <p><strong>Capacidad:</strong> {establishment.capacity}</p>
          <p><strong>Horario:</strong> {establishment.operatingHours}</p>
          <p><strong>Email:</strong> {establishment.email}</p>
          <p><strong>Sitio web:</strong> <a href={establishment.website} target="_blank" rel="noopener noreferrer">{establishment.website}</a></p>
          <p><strong>Descripción:</strong> {establishment.description}</p>
        </div>
      )}

      {canEditOrAddProduct && (
                <div className="flex w-full justify-between">
                    <Button onClick={handleEditEstablishment}>Editar establecimiento</Button>
                    <Button onClick={handleAddProduct}>+ Añadir producto</Button>
                </div>
            )}

      <div className="flex space-x-4 mb-8 mt-4 border-b border-t pt-4 pb-4">
        {productCategories.length > 0 ? productCategories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        )) : (<div>Este establecimiento no tiene productos todavía...</div>)}
      </div>

      <div>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            availability={product.availability}
            isOwner={canEditOrAddProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default EstablishmentPage;
