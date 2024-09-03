interface OrderProductCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    availability: boolean;
    quantity: number; // cantidad actual en el carrito
    onAdd: () => void;
    onRemove: () => void;
  }
  
  const OrderProductCard: React.FC<OrderProductCardProps> = ({
    id,
    name,
    description,
    price,
    availability,
    quantity,
    onAdd,
    onRemove
  }) => {
    return (
      <div className="border rounded-lg p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-gray-900 font-bold mb-2">${Number(price).toFixed(2)}</p>
        <p className={`text-sm mb-2 ${availability ? 'text-green-500' : 'text-red-500'}`}>
          {availability ? 'Disponible' : 'No disponible'}
        </p>
        
        {availability && (
          <div className="flex items-center space-x-4">
            <button 
              className={`px-2 py-1 rounded ${quantity > 0 ? 'bg-red-500 text-white cursor-pointer' : 'bg-red-200 text-gray-500 cursor-not-allowed'}`}
              onClick={onRemove}
              disabled={quantity === 0}
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={onAdd}
            >
              +
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default OrderProductCard;
  