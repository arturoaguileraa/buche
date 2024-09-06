"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/app/api/api';

interface User {
  id: number;
  name: string;
  email: string;
}

const AddWaiterPage = () => {
  const { establishmentId } = useParams(); // ID del establecimiento
  const [waiters, setWaiters] = useState<User[]>([]);
  const [filteredWaiters, setFilteredWaiters] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchWaiters = async () => {
    try {
      const response = await api.get('/users/waiters-without-establishment');
      console.log(response.data);
      
      setWaiters(response.data);
      setFilteredWaiters(response.data); // Inicialmente todos los camareros
    } catch (error) {
      console.error('Error fetching waiters:', error);
    }
  };
  useEffect(() => {

    fetchWaiters();
  }, []);

  // Filtrar camareros según el término de búsqueda
  useEffect(() => {
    const results = waiters.filter((waiter) =>
      waiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      waiter.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWaiters(results);
  }, [searchTerm, waiters]);

  const handleAddWaiter = async (waiterId: number) => {
    try {
      await api.post(`/establishments/${establishmentId}/add-waiter`, { waiterId });
      alert('Camarero añadido exitosamente');
      fetchWaiters();
    } catch (error) {
      console.error('Error adding waiter:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Añadir Camarero</h1>

      {/* Input para buscar camareros */}
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        placeholder="Buscar camarero por nombre o email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de camareros */}
      {filteredWaiters.length > 0 ? (
        <ul className="space-y-4">
          {filteredWaiters.map((waiter) => (
            <li
              key={waiter.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-md shadow-sm"
            >
              <div>
                <p className="text-lg font-semibold">{waiter.name}</p>
                <p className="text-gray-600">{waiter.email}</p>
              </div>
              <button
                onClick={() => handleAddWaiter(waiter.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Añadir
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No se encontraron camareros.</p>
      )}
    </div>
  );
};

export default AddWaiterPage;
