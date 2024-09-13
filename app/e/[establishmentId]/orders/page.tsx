"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client'; // Importa el cliente de WebSocket
import api from '@/app/api/api';
import OwnerOrderCard from '@/components/ui/OwnerOrderCard';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { Howl } from 'howler'; 

// Asegúrate de que la URL coincida con tu servidor de WebSocket

const socket = io(process.env.NEXT_PUBLIC_API_URL + '');

export interface Table {
  number: number;
  establishment: any;
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
  status: any;
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
  const [showNotification, setShowNotification] = useState(false); // Estado para la notificación
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Configurar el sonido de notificación
  const notificationSound1 = new Howl({
    src: ['/notification.mp3'], // Asegúrate de que la ruta esté bien configurada
    volume: 1.0, // Ajusta el volumen si es necesario
  });
  const notificationSound2 = new Howl({
    src: ['/waiter-notification.mp3'], // Asegúrate de que la ruta esté bien configurada
    volume: 1.0, // Ajusta el volumen si es necesario
  });

  // Función para fetchear pedidos
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
    // Fetchear los pedidos iniciales
    fetchOrders();

    // Conectamos al WebSocket cuando el componente se monta
    socket.on('connect', () => {
      console.log('Conectado al WebSocket');
    });

  // Escuchar el evento 'orderUpdate' desde el servidor WebSocket
  socket.on('orderUpdate', (updatedOrder) => {
    // Solo procesar si el establecimiento coincide
    if (updatedOrder.establishmentId === Number(establishmentId)) {
      notificationSound1.play();
      console.log('Nuevo pedido recibido:', updatedOrder);
      fetchOrders(); // Actualizar la lista de pedidos
    }
  });

  // Escuchar el evento 'waiterCalled' desde el servidor WebSocket
  socket.on('waiterCalled', (data) => {
    // Solo procesar si el establecimiento coincide
    if (Number(data.establishmentId) === Number(establishmentId)) {
      notificationSound2.play();
      setNotificationMessage(data.message);
      setShowNotification(true); // Mostrar la notificación

      // Ocultar la notificación después de 15 segundos
      setTimeout(() => {
        setShowNotification(false);
      }, 15000);
    }
  });

  }, [establishmentId]);

  // Función para agrupar pedidos por día
  const groupOrdersByDay = (orders: Order[]) => {
    return orders.reduce((groups: { [date: string]: Order[] }, order: Order) => {
      const date = new Date(order.date).toLocaleDateString(); // Convertir la fecha en string
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});
  };

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
    return <Loader message='Cargando pedidos...'></Loader>;
  }

  // Ordenar los pedidos por fecha
  const sortedOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Agrupar los pedidos por día
  const groupedOrders = groupOrdersByDay(sortedOrders);

  return (
    <div className="bg-blue-100 p-5 min-h-screen">
      {/* Notificación visual (Snackbar/Toast) */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded shadow-lg transition duration-500 ease-in-out">
          {notificationMessage}
        </div>
      )}
      <div className='flex justify-between mb-5'>
        <h1 className="text-2xl font-bold text-center">Pedidos - {sortedOrders[0]?.table.establishment.name}</h1>
        <Button onClick={fetchOrders}>Recargar nuevos pedidos</Button>
      </div>
      {Object.entries(groupedOrders).map(([date, orders]) => (
        <div key={date} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{date}</h2>
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
              <div className="text-center col-span-full">No hay pedidos disponibles para esta fecha.</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
