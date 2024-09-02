import api from '@/app/api/api';
import React, { useState } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  isOwner: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  availability,
  isOwner,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id,
    name,
    description,
    price,
    availability,
  });

  const handleDelete = async () => {
    try {
        // Suponiendo que tienes el `id` del producto disponible
        const response = await api.delete(`/products/${editedProduct.id}`);
        
        if (response.status === 200) {
            console.log('Producto eliminado');
            window.location.reload();
        }
    } catch (error) {
        console.error('Error eliminando el producto:', error);
    } finally {
        setIsDeleteModalOpen(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
        // Suponiendo que tienes el `id` del producto y los datos editados en `editedProduct`
        const {id, ...editeddto} = editedProduct
        const response = await api.patch(`/products/${editedProduct.id}`, editeddto);
        
        if (response.status === 200) {
            console.log('Producto editado:', editedProduct);
            window.location.reload();
        }
    } catch (error) {
        console.error('Error editando el producto:', error);
    } finally {
        setIsEditModalOpen(false);
    }
};


  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-900 font-bold mb-2">${price}</p>
      <p className={`text-sm ${availability ? 'text-green-600' : 'text-red-600'}`}>
        {availability ? 'Disponible' : 'No disponible'}
      </p>

      {isOwner && (
        <div className="mt-4 flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setIsEditModalOpen(true)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Borrar
          </button>
        </div>
      )}

      {/* Modal para edición */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl mb-4">Editar Producto</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(); }}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedProduct.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Descripción</label>
                <input
                  type="text"
                  name="description"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedProduct.description}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Precio</label>
                <input
                  type="number"
                  name="price"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedProduct.price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Disponibilidad</label>
                <input
                  type="checkbox"
                  name="availability"
                  className="mr-2 leading-tight"
                  checked={editedProduct.availability}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      availability: e.target.checked,
                    })
                  }
                />
                <span>{editedProduct.availability ? 'Disponible' : 'No disponible'}</span>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para confirmación de borrado */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl mb-4">Confirmar Borrado</h2>
            <p className="mb-4">¿Estás seguro de que quieres eliminar este producto?</p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
