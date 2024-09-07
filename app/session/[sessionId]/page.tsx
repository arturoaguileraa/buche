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
    

  }

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
      <h1 className="text-2xl font-bold mb-6">Resumen de pedidos para la sesión {sessionId}</h1>
      {orders.length === 0 ? (
        <p>No hay pedidos asociados a esta sesión.</p>
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
      
      {/* Botón para volver a los pedidos */}
      <button
        onClick={handleGoBack} // Navegación
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Volver a los pedidos
      </button>
    </div>
  );
};

export default OrdersPage;
