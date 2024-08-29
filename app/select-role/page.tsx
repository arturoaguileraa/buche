'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SessionButton from '@/components/ui/SessionButton';
import api from '../api/api';

const SelectRolePage = () => {
  const { data: session } = useSession();
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleRoleSelection = async () => {
    if (!role) {
      console.error('No role selected');
      return;
    }

    const confirmSelection = window.confirm(
      '¿Estás seguro de que quieres seleccionar este rol? Esta decisión no se puede cambiar después.'
    );

    if (!confirmSelection) {
      return;
    }

    const token = session?.accessToken;

    try {
      await api.post('/auth/set-role', { role }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect to the home page
      router.push('/home');
    } catch (error) {
      console.error('Error setting role:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <SessionButton></SessionButton>
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a Buche</h1>
        <p className="mb-6 text-gray-700">
          Buche es tu compañero ideal para gestionar tus visitas a restaurantes. Por favor, selecciona tu rol para que podamos personalizar tu experiencia.
        </p>
        <div className="mb-6">
          <button
            className={`block w-full py-2 px-4 rounded mb-3 text-white ${role === 'CLIENT' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={() => setRole('CLIENT')}
          >
            Cliente
          </button>
          <p className="text-sm text-gray-600 mb-4">Como Cliente, podrás explorar restaurantes, unirte a mesas y hacer pedidos.</p>
          <button
            className={`block w-full py-2 px-4 rounded mb-3 text-white ${role === 'WAITER' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}
            onClick={() => setRole('WAITER')}
          >
            Camarero
          </button>
          <p className="text-sm text-gray-600 mb-4">Como Camarero, podrás gestionar los pedidos de todas las mesas de tu restaurante.</p>
          <button
            className={`block w-full py-2 px-4 rounded mb-3 text-white ${role === 'OWNER' ? 'bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'}`}
            onClick={() => setRole('OWNER')}
          >
            Dueño
          </button>
          <p className="text-sm text-gray-600 mb-4">Como Dueño, podrás crear productos y categorías para añadir al menú de tu establecimiento.</p>
        </div>
        <button
          onClick={handleRoleSelection}
          disabled={!role}
          className={`w-1/2 py-2 px-4 rounded ${!role ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default SelectRolePage;
