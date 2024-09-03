import router, { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Define el tipo para la mesa
interface Table {
  establishmentId: number;
  number: number;
  status: 'available' | 'occupied' | 'reserved';
  capacity?: number; // Capacidad es opcional
}

// Define las props que acepta TableCard
interface TableCardProps {
  table: Table;
  onDelete: (establishmentId: number, tableNumber: number) => void;
  onEdit: (establishmentId: number, tableNumber: number, status: string, capacity: number) => void;
}

const TableCard: React.FC<TableCardProps> = ({ table, onDelete, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState(table.status);
  const [editCapacity, setEditCapacity] = useState(table.capacity || 0);
  const router = useRouter()
  const handleDeleteClick = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    onDelete(table.establishmentId, table.number);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmEdit = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    onEdit(table.establishmentId, table.number, editStatus, editCapacity);
    setIsEditModalOpen(false);
  };

  const handleClick = () => {
    router.push(`/e/${table.establishmentId}/tables/${table.number}`);
  };

  return (
    <>
    <div onClick={handleClick} className="cursor-pointer border rounded-lg shadow-md p-4 m-2">
      <h3 className="text-xl font-semibold mb-2">Mesa {table.number}</h3>
      <p>Estado: {table.status}</p>
      <p>Capacidad: {table.capacity || 'N/A'}</p>
      <div className="flex justify-end mt-4">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded mr-2"
          onClick={handleDeleteClick}
        >
          Borrar
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleEditClick}
        >
          Editar
        </button>
      </div>

      

    </div>
    {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h4>¿Estás seguro de que quieres borrar esta mesa?</h4>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                onClick={handleConfirmDelete}
              >
                Sí, borrar
              </button>
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={(e) => {e.stopPropagation(); setIsDeleteModalOpen(false);}}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h4>Editar Mesa {table.number}</h4>
            <div className="mt-4">
              <label className="block mb-2">
                Estado:
                <select
                  className="block w-full mt-1"
                  value={editStatus}
                  onChange={(e) => {e.stopPropagation(); setEditStatus(e.target.value as 'available' | 'occupied' | 'reserved')}}
                >
                  <option value="available">Disponible</option>
                  <option value="occupied">Ocupada</option>
                  <option value="reserved">Reservada</option>
                </select>
              </label>
              <label className="block mb-2">
                Capacidad:
                <input
                  type="number"
                  className="block w-full mt-1"
                  value={editCapacity}
                  onChange={(e) => {e.stopPropagation();setEditCapacity(parseInt(e.target.value)); }}
                />
              </label>
            </div>
            <div className="flex justify-around mt-4">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={(e) => {e.stopPropagation(); setIsEditModalOpen(false);}}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={handleConfirmEdit}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}</>
  );
};

export default TableCard;
