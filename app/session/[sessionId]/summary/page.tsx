'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/app/api/api';
import OrderCard from '@/components/ui/OrderCard';
import Loader from '@/components/ui/loader';

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

interface Session {
  id: number;
  startTime: string;
  endTime: string | null;
  orders: Order[];
}

const SessionSummaryPage = () => {
  const router = useRouter();
  const { sessionId } = useParams();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fromFinalized = searchParams.get('from') === 'finalized';

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        if (sessionId) {
          const response = await api.get(`/sessions/${sessionId}`);
          setSession(response.data);
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  const handleBackToHome = () => {
    router.push('/');
  };

  // Calcular el total acumulado de los pedidos que no estén cancelados
  const totalSessionAmount = session?.orders
    .filter(order => order.status === 'completed') // Filtrar los pedidos que no están cancelados
    .reduce((total, order) => total + Number(order.total), 0) || 0;

  // Calcular la cantidad total de productos pedidos de los pedidos que no están cancelados
  const totalProductsOrdered = session?.orders
    .filter(order => order.status === 'completed') // Filtrar los pedidos que no están cancelados
    .reduce((total, order) => {
      return total + order.orderProducts.reduce((sum, product) => sum + product.quantity, 0);
    }, 0) || 0;

  if (loading) {
    return (
      <Loader></Loader>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-700">Sesión no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        {fromFinalized && (
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            ¡Muchas gracias por su visita!
          </h1>
        )}

        <div className="mb-6">
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Sesión empezada el:</span> {new Date(session.startTime).toLocaleString()}
          </p>
          {session.endTime && (
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Sesión terminada el:</span> {new Date(session.endTime).toLocaleString()}
            </p>
          )}
        </div>

        {/* Mostrar total acumulado de los pedidos */}
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow mb-6 text-center">
          <p className="text-xl font-semibold">Cuenta Total: {totalSessionAmount} €</p>
          <p className="text-lg font-medium">Total de productos pedidos: {totalProductsOrdered}</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tus pedidos</h2>

        {session.orders.length > 0 ? (
          <ul className="space-y-4">
            {session.orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600">No tienes pedidos.</p>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleBackToHome}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionSummaryPage;
