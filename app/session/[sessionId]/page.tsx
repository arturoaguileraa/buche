'use client';

import api from '@/app/api/api';
import Loader from '@/components/ui/loader';
import { useParams, useRouter } from 'next/navigation'; // Importar useRouter
import React, { useState, useEffect } from 'react';

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

interface Session {
  id: number;
  establishmentId: number;
  tableNumber: number;
}

const OrdersPage: React.FC = () => {
  const { sessionId } = useParams(); // Obtener sessionId de los parámetros de la URL
  const router = useRouter(); // Usar useRouter para la navegación
  const [orders, setOrders] = useState<Order[]>([]);
  const [session, setSession] = useState<Session | null>(null); // Estado para la sesión
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionAndOrders = async () => {
      try {
        // Petición para obtener la sesión actual
        const sessionResponse = await api.get(`/sessions/${sessionId}`);
        const sessionData = sessionResponse.data;
        console.log(sessionData);
        
        setSession(sessionData);

        // Petición para obtener los pedidos asociados a la sesión
        const ordersResponse = await api.get(`/orders/sessions/${sessionId}`);
        setOrders(ordersResponse.data);
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndOrders();
  }, [sessionId]);

  const handleGoBack = async () => {
    try {
        const sessionResponse = await api.get(`sessions/${sessionId}`)

        const session = sessionResponse.data
        router.push(`/e/${session.table.establishmentId}/tables/${session.table.number}`)
    } catch (error) {
        console.error("Error al volver", error)
    }
  };

  // Calcular el total de todos los pedidos (cuenta actual)
  const totalAmount = orders.reduce((sum, order) => sum + Number(order.total), 0);

  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!session) {
    return <p>No se encontró la sesión.</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Resumen de Pedidos - Mesa {session.tableNumber}</h1>
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Sesión #{sessionId}</h2>

      {/* Total acumulado */}
      <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow mb-6 text-center">
        <p className="text-xl font-semibold">Total Actual de la Cuenta: {totalAmount} €</p>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No hay pedidos asociados a esta sesión.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Pedido #{order.id}</h2>
            <p><strong>Estado:</strong> <span className="text-gray-600">{order.status}</span></p>
            <p><strong>Total:</strong> <span className="text-gray-600">{order.total} €</span></p>
            <p><strong>Fecha:</strong> <span className="text-gray-600">{new Date(order.date).toLocaleDateString()}</span></p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Productos:</h3>
              <ul className="list-disc ml-6">
                {order.orderProducts.map((product) => (
                  <li key={product.id} className="text-gray-700">
                    {product.quantity}x {product.name} - {product.priceAtTimeOfOrder} € (Total: {(product.quantity * product.priceAtTimeOfOrder)} €)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}

      {/* Botón para volver a los pedidos */}
      <div className="text-center">
        <button
          onClick={handleGoBack} // Navegación
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Volver a los pedidos
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
