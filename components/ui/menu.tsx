// components/Menu.tsx

'use client';

import React, { useState, useEffect } from 'react';
import api from '@/app/api/api';
import OrderProductCard from './orderProductCard';
import ProductCard from '../productcard';
import OrderSummaryBar from './orderSumaryBar';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  category: { id: number };
}

interface ProductCategory {
  id: number;
  name: string;
  description?: string;
}

interface MenuProps {
  establishmentId: number;
  canEditOrAddProduct: boolean;
  inSession: boolean; // Nuevo parámetro para determinar si se está en sesión
}

const Menu: React.FC<MenuProps> = ({ establishmentId, canEditOrAddProduct, inSession }) => {
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [productId: number]: number }>({}); // Estado para manejar el carrito

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await api.get(`/product-categories/${establishmentId}`);
        setProductCategories(response.data);
        setSelectedCategory(response.data[0]?.id || '');
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products/establishment/${establishmentId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductCategories();
    fetchProducts();
  }, [establishmentId]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (productId: number) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const filteredProducts = products.filter(product => product.category.id === selectedCategory);

  const totalAmount = Object.keys(cart).reduce(
    (sum, productId) => {
      const product = products.find(product => product.id === Number(productId));
      return sum + (product?.price || 0) * cart[Number(productId)];
    },
    0
  );
  

  return (
    <div className="relative"> {/* relative positioning to contain the fixed bar */}
    <h1 className="flex justify-center text-xl font-bold text-gray-700 mt-2">{inSession ? "¿Qué te apetece hoy?" : "Menú"}</h1>
      <div className="flex space-x-4 mb-8 mt-2 border-b border-t pt-4 pb-4">
        {productCategories.length > 0 ? (
          productCategories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))
        ) : (
          <div>Este establecimiento no tiene productos todavía...</div>
        )}
      </div>

      <div>
        {filteredProducts.map(product => (
          inSession ? (
            <OrderProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              availability={product.availability}
              quantity={cart[product.id] || 0} // Cantidad en el carrito
              onAdd={() => handleAddToCart(product.id)}
              onRemove={() => handleRemoveFromCart(product.id)}
            />
          ) : (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              availability={product.availability}
              isOwner={canEditOrAddProduct}
            />
          )
        ))}
      </div>

      {/* Barra de resumen del pedido */}
      {inSession && (
        <OrderSummaryBar totalAmount={totalAmount} />
      )}
    </div>
  );
};

export default Menu;
