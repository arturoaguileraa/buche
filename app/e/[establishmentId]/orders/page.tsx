"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/app/api/api';
import OwnerOrderCard from '@/components/ui/OwnerOrderCard';
import { Button } from '@/components/ui/button';

export interface Table {
  number: number;
  establishmentId: number;
}

export interface User {
  id: number;
  name: string;
}

export interface OrderProduct {
  product: any;
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Session {
  id: number;
  date: string;
}

export interface Order {
  id: number;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  date: string;
  table: Table;
  user: User;
  orderProducts: OrderProduct[];
  session: Session;
}

const OrderPage = () => {
  const { establishmentId } = useParams(); // Obtener establishmentId de la URL
  const [orders, setOrders] = useState<Order[]>([]); // Estado para almacenar los pedidos tipados con la interfaz Order
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orders/establishment/${establishmentId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {


    fetchOrders();
  }, [establishmentId]);

  // Función para actualizar el pedido en la lista
  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(prevOrders => 
      prevOrders.map(order => order.id === updatedOrder.id ? updatedOrder : order)
    );
  };

  const handleDeleteOrder = (orderId: number) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  if (loading) {
    return <div className="text-center">Cargando pedidos...</div>;
  }

  return (
    <div className="bg-blue-100 p-5 min-h-screen">
    <div className='flex justify-between  mb-5'>
        <h1 className="text-xl font-bold text-center">Pedidos</h1>
        <Button onClick={fetchOrders}>Recargar nuevos pedidos</Button>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <OwnerOrderCard 
              key={index} 
              order={order} 
              onUpdateOrder={handleUpdateOrder} // Pasamos la función de actualización
              onDeleteOrder={handleDeleteOrder}
            />
          ))
        ) : (
          <div className="text-center col-span-full">No hay pedidos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
