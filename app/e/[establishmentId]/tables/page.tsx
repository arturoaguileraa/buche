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
  const router = useRouter()

  useEffect(() => {
    if (establishmentId) {
      api.get(`/tables/${establishmentId}`)
        .then((response) => {
          setTables(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tables:', error);
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

  if (!tables.length) {
    return <Loader message='Cargando mesas...'></Loader>;
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Mesas del Establecimiento</h1>
      <div className='flex my-2'><Button  onClick={handleAddTable}>+ Añadir mesa</Button></div>
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
  );
};

export default TablesPage;
