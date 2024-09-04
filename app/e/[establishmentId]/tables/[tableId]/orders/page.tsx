'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import api from "../../../../../api/api"
interface Order {
  id: number;
  status: string;
  total: number;
  date: string;
  orderProducts: {
    id: number;
    name: string;
    quantity: number;
    priceAtTimeOfOrder: number;
  }[];
}

const OrdersPage: React.FC = () => {
  const { establishmentId, tableId } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orders/establishments/${establishmentId}/tables/${tableId}`);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los pedidos');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [establishmentId, tableId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Resumen de pedidos para la Mesa {tableId}</h1>
      {orders.length === 0 ? (
        <p>No hay pedidos asociados a esta mesa.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-4 p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Pedido #{order.id}</h2>
            <p><strong>Estado:</strong> {order.status}</p>
            <p><strong>Total:</strong> {order.total} €</p>
            <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Productos:</h3>
              <ul className="list-disc ml-6">
                {order.orderProducts.map((product) => (
                  <li key={product.id}>
                    {product.quantity}x {product.name} - {product.priceAtTimeOfOrder} €
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
