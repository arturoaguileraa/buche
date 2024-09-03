"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/app/api/api';
import { useProfileData } from '@/app/utils/jwtUtils';
import Menu from '@/components/ui/menu';
import { Button } from '@/components/ui/button';

interface User {
    id : number;
}

const TablePage = () => {
  const router = useRouter();
  const profileData = useProfileData();
  const { establishmentId, tableId } = useParams();
  const [tableStatus, setTableStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
      const fetchTableStatus = async () => {
          try {
              const response = await api.get(`/tables/${establishmentId}/${tableId}`);
              setTableStatus(response.data.status);
              setUser(response.data.user);
              setIsLoading(false);
          } catch (error) {
              console.error('Error fetching table status:', error);
          }
      };

      fetchTableStatus();
  }, [tableId]);
  

  if (isLoading) {
      return <p>Loading...</p>;
  }

  const handleStartSession = async () => {
    try {
      await api.patch(`/tables/${establishmentId}/${tableId}`, {
        status: 'occupied',
        userId: profileData?.id,
      });
      window.location.reload()
    } catch (error) {
      console.error('Error starting session:', error);
    }
    
  };

  const handleEndSession = async () => {
    try {
      await api.patch(`/tables/${establishmentId}/${tableId}`, {
        status: 'available',
        userId: null, // Desasociar la mesa del usuario
      });
      window.location.reload()
    } catch (error) {
      console.error('Error ending session:', error);
    }
    
  };
  

  if (tableStatus === 'available') {
      return (
          <div className='flex items-center justify-center min-h-screen flex-col h-full'>
              <p>La mesa está disponible. ¿Quieres crear una sesión?</p>
              <Button onClick={handleStartSession}>Sí, crear sesión</Button>
          </div>
      );
  }

  if (tableStatus === 'occupied') {

      if (user?.id !== profileData?.id) {
          return <p>Lo siento, esta mesa ya está ocupada.</p>;
      } else if (sessionStarted || `${user?.id}` !== profileData?.id) {
          return (
            <div className="container mx-auto py-8">
                <p>Bienvenido de nuevo a tu sesión.</p>
                <div className="flex justify-between items-center mb-4">
                <Button onClick={handleEndSession} className="bg-red-500 text-white">
                    Finalizar Sesión
                </Button>
                </div>
                <Menu establishmentId={+establishmentId} canEditOrAddProduct={false} inSession={true}/>
            </div>
          );
      }
  }

  return null;
};
export default TablePage;