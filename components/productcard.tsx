// components/ProductCard.tsx
import React from 'react';

interface ProductCardProps {
  name: string;
  description: string;
  currentPrice: number;
  availability: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, currentPrice, availability }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-900 font-bold mb-2">${currentPrice.toFixed(2)}</p>
      <p className={`text-sm ${availability ? 'text-green-600' : 'text-red-600'}`}>
        {availability ? 'Disponible' : 'No disponible'}
      </p>
    </div>
  );
};

export default ProductCard;