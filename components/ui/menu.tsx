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
  inSession: boolean;
  handleSubmitOrder: (total : number) => void; // Función que se ejecuta al hacer el pedido
}

const Menu: React.FC<MenuProps> = ({ establishmentId, canEditOrAddProduct, inSession, handleSubmitOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ productId: number, quantity: number, priceAtTimeOfOrder: number }[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para el modal


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

  const addProductToCart = (productId: number, priceAtTimeOfOrder: number) => {
    setCart(prevCart => {
        const existingProduct = prevCart.find(item => item.productId === productId);
        if (existingProduct) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            return prevCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // Si no está en el carrito, lo añade
            return [...prevCart, { productId, quantity: 1, priceAtTimeOfOrder }];
        }
    });
};

const removeProductFromCart = (productId: number) => {
  setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.productId === productId);
      if (existingProduct && existingProduct.quantity > 1) {
          // Si el producto está en el carrito y la cantidad es mayor a 1, disminuye la cantidad
          return prevCart.map(item =>
              item.productId === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
          );
      } else {
          // Si la cantidad es 1, elimina el producto del carrito
          return prevCart.filter(item => item.productId !== productId);
      }
  });
};

const handleSubmitOrderProducts = async () => {
  try {
    // Primero crea el order y almacena su id
    const orderId = await handleSubmitOrder(totalAmount);

    // Ahora, recorre los productos en el carrito (cart) y crea un order-product para cada uno
    const promises = cart.map(async (cartItem) => {
      const { productId, quantity, priceAtTimeOfOrder } = cartItem;

      if (quantity > 0) {
        // Crear el payload para el order-product
        const orderProductPayload = {
          orderId, // El id del pedido que acabamos de crear
          productId,
          quantity,
          priceAtTimeOfOrder : Number(priceAtTimeOfOrder), // Usamos el precio almacenado en el carrito
        };

        // Hacer la solicitud POST a /order-product
        await api.post('/orders/order-product', orderProductPayload);
      }
    });

    // Esperamos que todas las promesas de creación de order-product se resuelvan
    await Promise.all(promises);

    // Aquí puedes manejar qué pasa después de que todos los order-products se hayan creado
    alert('Productos asociados al pedido con éxito');
    window.location.reload()
  } catch (error) {
    console.error('Error al asociar los productos al pedido:', error);
    alert('Hubo un problema al asociar los productos al pedido');
  }
};

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

const handleConfirmOrder = () => {
  handleSubmitOrderProducts(); // Llamamos a la función para enviar el pedido
  closeModal(); // Cerramos el modal
};

  const filteredProducts = products.filter(product => product.category.id === selectedCategory);

  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.priceAtTimeOfOrder, 0);
  

  return (
    <div className="relative"> {/* relative positioning to contain the fixed bar */}
    <h1 className="flex justify-center text-xl font-bold text-gray-700 mt-2">{inSession ? "¿Qué te apetece hoy?" : "Menú"}</h1>
    <div className="overflow-x-auto whitespace-nowrap mb-8 mt-2 border-b border-t pt-4 pb-4">
    <div className="inline-flex space-x-4">
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
              quantity={cart.find(item => item.productId === product.id)?.quantity || 0} // Cantidad en el carrito
              onAdd={() => addProductToCart(product.id, product.price)}
              onRemove={() => removeProductFromCart(product.id)}
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
        <OrderSummaryBar totalAmount={totalAmount} clickFunction={openModal} />
      )}

      {/* Modal para el resumen del pedido */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full m-3">
            <h2 className="text-2xl font-bold mb-4">Resumen del pedido</h2>
            <ul className="mb-4">
              {cart.map((item) => {
                const product = products.find(p => p.id === item.productId);
                return product ? (
                  <li key={item.productId} className="flex justify-between">
                    <span>{item.quantity} x {product.name}</span>
                    <span>({item.quantity}x{product.price}){(item.quantity * product.price).toFixed(2)}€</span>
                  </li>
                ) : null;
              })}
            </ul>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>{totalAmount.toFixed(2)}€</span>
            </div>
            <p className="mt-4">¿Estás seguro de que deseas hacer el pedido?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded">Cancelar</button>
              <button onClick={handleConfirmOrder} className="px-4 py-2 bg-blue-500 text-white rounded">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
