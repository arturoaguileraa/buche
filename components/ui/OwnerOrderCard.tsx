import api from '@/app/api/api';
import React, { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

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
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  date: string;
  table: Table;
  user: User;
  orderProducts: OrderProduct[];
  session: Session;
}

interface OwnerOrderCardProps {
  order: Order;
  onUpdateOrder: (updatedOrder: Order) => void;
  onDeleteOrder: (orderId: number) => void;
}

const OwnerOrderCard: React.FC<OwnerOrderCardProps> = ({ order, onUpdateOrder, onDeleteOrder }) => {
  const [status, setStatus] = useState(order.status);

  const updateOrderStatus = async (newStatus: 'completed' | 'cancelled') => {
    try {
      await api.patch(`/orders/${order.id}/status`, { status: newStatus });
      setStatus(newStatus);
      onUpdateOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error('Error actualizando el pedido', error);
    }
  };

  const deleteOrder = async () => {
    try {
      await api.delete(`/orders/${order.id}`);
      onDeleteOrder(order.id);
    } catch (error) {
      console.error('Error eliminando el pedido', error);
    }
  };

  return (
    <div className="bg-white p-3 shadow rounded-lg flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Mesa {order.table.number}</h2>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded"
          onClick={deleteOrder}
        >
          <TrashIcon></TrashIcon>
        </button>
      </div>

      <ul className="flex-grow">
        {order.orderProducts.map((item, idx) => (
          <li key={idx} className="flex justify-between border-b py-2">
            <span>{`x${item.quantity} ${item.product.name}`}</span>
          </li>
        ))}
      </ul>

      {/* Mantén el total y los botones o el estado fijos en la parte inferior */}
      <div className="mt-1">
          <strong>Total: </strong>${order.total}
      </div>

      <div className="mt-3">
        {status === 'pending' ? (
          <div className="flex justify-between w-full">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded w-full mr-2"
              onClick={() => updateOrderStatus('completed')}
            >
              Marcar como entregado
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded w-full ml-2"
              onClick={() => updateOrderStatus('cancelled')}
            >
              Cancelar pedido
            </button>
          </div>
        ) : (
          <p className={`text-center mt-3 ${status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
            {status === 'completed' ? 'Pedido entregado' : 'Pedido cancelado'}
          </p>
        )}
      </div>
    </div>
  );
};

export default OwnerOrderCard;
