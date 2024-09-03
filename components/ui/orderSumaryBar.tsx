import React from 'react';

interface OrderSummaryBarProps {
  totalAmount: number;
}

const OrderSummaryBar: React.FC<OrderSummaryBarProps> = ({ totalAmount }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      <span>Total: ${totalAmount.toFixed(2)}</span>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Hacer pedido
      </button>
    </div>
  );
};

export default OrderSummaryBar;
