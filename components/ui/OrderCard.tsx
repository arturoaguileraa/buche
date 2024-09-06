import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderProduct {
  id: number;
  quantity: number;
  priceAtTimeOfOrder: number;
  product: Product;
}

interface Order {
  id: number;
  status: string;
  total: number;
  date: string;
  orderProducts: OrderProduct[];
}

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const [showProducts, setShowProducts] = useState(false);

  const handleToggleProducts = () => {
    setShowProducts(prev => !prev);
  };

  return (
    <li className="border border-gray-200 rounded-lg p-4 shadow-sm">
      <p className="text-lg text-gray-700">
        <span className="font-semibold">ID de pedido:</span> {order.id}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-semibold">Total:</span> ${order.total}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-semibold">Fecha:</span> {new Date(order.date).toLocaleString()}
      </p>
      <button
        onClick={handleToggleProducts}
        className="bg-blue-600 text-white py-2 px-4 mt-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        {showProducts ? 'Hide Products' : 'Show Products'}
      </button>
      
      {showProducts && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Productos</h3>
          <ul className="space-y-2">
            {order.orderProducts.map(op => (
              <li key={op.id} className="border border-gray-300 rounded-lg p-2">
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Nombre del producto:</span> {op.product.name}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Cantidad:</span> {op.quantity}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Precio:</span> ${op.priceAtTimeOfOrder}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default OrderCard;
