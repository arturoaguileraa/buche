interface OrderSummaryBarProps {
  totalAmount: number;
  clickFunction: () => void;
}

const OrderSummaryBar: React.FC<OrderSummaryBarProps> = ({ totalAmount, clickFunction }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-slate-900 p-4 shadow-md"
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-between items-center">
        <div className="text-xl text-white font-semibold">Total: ${totalAmount.toFixed(2)}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={clickFunction}
        >
          Hacer pedido
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryBar;
