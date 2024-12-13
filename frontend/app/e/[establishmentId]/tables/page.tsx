"use client"

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/app/api/api';
import TableCard from '@/components/ui/table-card';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';

interface Table {
  establishmentId: number;
  number: number;
  status: 'available' | 'occupied' | 'reserved';
  capacity?: number; // Capacidad es opcional
}

const TablesPage = () => {
  const { establishmentId } = useParams();
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de loading
  const router = useRouter()

  useEffect(() => {
    if (establishmentId) {
      api.get(`/tables/${establishmentId}`)
        .then((response) => {
          setTables(response.data);
          setLoading(false); // Datos cargados, detenemos el estado de loading
        })
        .catch((error) => {
          console.error('Error fetching tables:', error);
          setLoading(false); // Detenemos el loading aunque haya un error
        });
    }
  }, [establishmentId]);

  const handleAddTable = async () => {
    try {
      // Hacer una solicitud POST para crear una nueva mesa
      const response = await api.post(`/tables`, { establishmentId });
      
      if (response.status === 201) {
        const newTable = response.data; // Suponiendo que la API devuelve la mesa recién creada
        setTables((prevTables) => [...prevTables, newTable]); // Añadir la nueva mesa al estado
      }
    } catch (error) {
      console.error('Error añadiendo la mesa:', error);
      alert('Hubo un problema al añadir la mesa');
    }
  };

  const handleDeleteTable = async (establishmentId: any, tableNumber: number) => {
    await api.delete(`/tables/${establishmentId}/${tableNumber}`);
    setTables(tables.filter((table) => table.number !== tableNumber));
  };

  const handleEditTable = async (establishmentId: any, tableNumber: number, status: any, capacity: any) => {
    await api.patch(`/tables/${establishmentId}/${tableNumber}`, { status, capacity });
    setTables(
      tables.map((table) =>
        table.number === tableNumber ? { ...table, status, capacity } : table
      )
    );
  };

  if (loading) {
    return <Loader message='Cargando mesas...'></Loader>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Mesas del Establecimiento</h1>
    <Button onClick={handleAddTable} className="mt-4">+ Añadir mesa</Button>
      {/* Mostrar el mensaje si no hay mesas */}
      {!tables.length ? (
        <div className="text-center mt-8">
          <p className="text-lg">Este establecimiento no tiene mesas todavía.</p>
          
        </div>
      ) : (
        <div>
          <div className='flex my-2'>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <TableCard
                key={`${table.establishmentId}-${table.number}`}
                table={table}
                onDelete={handleDeleteTable}
                onEdit={handleEditTable}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TablesPage;
