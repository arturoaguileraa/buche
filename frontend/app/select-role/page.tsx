'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import api from '../api/api';
import { Button } from '@/components/ui/button';

const SelectRolePage = () => {
  const { data: session } = useSession();
  const [role, setRole] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRoleSelection = async () => {
    const token = session?.accessToken;
  
    try {
      // Realiza la petición para cambiar el rol
      const response = await api.post('/auth/set-role', { role }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Redirigir al usuario y obtener la nueva sesión con los datos actualizados
      signOut();
      
      // En la nueva página, puedes obtener la sesión actualizada con `getSession()`
  
    } catch (error) {
      console.error('Error setting role:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a Buche</h1>
        <p className="mb-6 text-gray-700">
          Buche es tu compañero ideal para gestionar tus visitas a restaurantes. Por favor, selecciona tu rol para que podamos personalizar tu experiencia.
        </p>
        <div className="mb-6">
          <button
            className={`block w-full py-2 px-4 rounded mb-3 text-white ${role === 'CLIENT' ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-800'}`}
            onClick={() => setRole('CLIENT')}
          >
            Cliente
          </button>
          <p className="text-sm text-gray-600 mb-4">Como Cliente, podrás explorar restaurantes, unirte a mesas y hacer pedidos.</p>
          <button
            className={`block w-full py-2 px-4 rounded mb-3 text-white ${role === 'WAITER' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-800'}`}
            onClick={() => setRole('WAITER')}
          >
            Camarero
          </button>
          <p className="text-sm text-gray-600 mb-4">Como Camarero, podrás gestionar los pedidos de todas las mesas de tu restaurante.</p>
          <button
            className={`block w-full py-2 px-4 rounded mb-3 text-white ${role === 'OWNER' ? 'bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-800'}`}
            onClick={() => setRole('OWNER')}
          >
            Dueño
          </button>
          <p className="text-sm text-gray-600 mb-4">Como Dueño, podrás crear productos y categorías para añadir al menú de tu establecimiento.</p>
        </div>
        <button
          onClick={handleOpenPopup}
          disabled={!role}
          className={`w-1/2 py-2 px-4 rounded ${!role ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        >
          Confirmar
        </button>
      </div>
      {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <div className="bg-white p-6 rounded shadow-lg m-4">
                    <p>¿Estás seguro de que quieres seleccionar este rol? Esta decisión no se puede cambiar después. </p>
                    <div className="mt-4 flex justify-around">
                      <Button variant="secondary" onClick={handleClosePopup}>
                        Cancelar
                      </Button>
                      <Button
                        variant="destructive"
                        className="ml-4"
                        onClick={handleRoleSelection}
                      >
                        Seleccionar rol
                      </Button>
                    </div>
                  </div>
                </div>
              )}
    </div>
  );
};

export default SelectRolePage;
