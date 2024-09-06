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
  const [sessionId, setSessionId] = useState();
  const [sessionPopUp, setSessionPopUp] = useState(false);

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
      const date = new Date().toISOString();
      // Crear una nueva sesión
      const sessionResponse = await api.post('/sessions', {
        startTime: date, // Fecha y hora actuales
        endTime: null, // No se ha terminado aún
        isActive: true, // Sesión activa
        tableNumber: Number(tableId), // ID de la mesa
        establishmentId: Number(establishmentId), // ID del establecimiento
        userId: profileData?.id, // Asignar usuario a la sesión
      });
  
      console.log('Session created:', sessionResponse.data);

      // Actualizar el estado de la mesa a 'occupied'
      await api.patch(`/tables/${establishmentId}/${tableId}`, {
        status: 'occupied',
        userId: profileData?.id,
      });
  
      window.location.href=`/e/${establishmentId}/tables/${tableId}`;
      setSessionId(sessionResponse.data.id)
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };
  
  const handleEndSession = async () => {
    try {
      // Obtener la sesión activa (si es que hay una)
      
      
      const activeSessionResponse = await api.get(`/sessions/active/${establishmentId}/${tableId}`);
      
      const activeSession = activeSessionResponse.data; // Asumimos que hay solo una sesión activa por mesa
      console.log(activeSession);
      
      if (activeSession) {
        const date = new Date().toISOString();
        // Terminar la sesión activa (set isActive a false y establecer el endTime)
        await api.patch(`/sessions/${activeSession.id}`, {
          endTime: date, // Fecha y hora actuales para finalizar la sesión
          isActive: false, // Desactivar la sesión
        });
  
        console.log('Session ended:', activeSession.id);
      }
  
      // Actualizar el estado de la mesa a 'available'
      await api.patch(`/tables/${establishmentId}/${tableId}`, {
        status: 'available',
        userId: null, // Desasociar la mesa del usuario
      });
  
      window.location.href = `/session/${activeSession.id}/summary?from=finalized`;
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  const handleOpenPopup = () => {
    setSessionPopUp(true);
  };

  const handleClosePopup = () => {
    setSessionPopUp(false);
  };
    

  const handleSubmitOrder = async (totalAmount : number) => {
    try {
      // Fecha y hora actual
      const currentDate = new Date().toISOString();
      const sessionResponse = await api.get(`/sessions/active/${establishmentId}/${tableId}`)
      
      // Crear objeto de datos para el nuevo pedido
      const newOrder = {
        total: totalAmount,
        date: currentDate,
        establishmentId: Number(establishmentId),
        tableId: Number(tableId),  // tableId debería estar definido
        userId: profileData?.id,  // profileData.id contiene el ID del usuario
        sessionId: Number(sessionResponse.data.id)
      };
  
      // Hacer una solicitud POST al servidor para crear el pedido
      const response = await api.post('/orders', newOrder);
  
      // Si la solicitud es exitosa, devuelve el id del pedido
      if (response.status === 201) {
        const orderId = response.data.id; // Obtener el id del pedido creado
        console.log('Pedido creado con éxito. ID del pedido:', orderId);
        return orderId; // Retorna el ID del pedido
      } else {
        console.error('Error al crear el pedido. Código de estado:', response.status);
      }
    } catch (error) {
      console.error('Error creando el pedido:', error);
      alert('Error al crear el pedido');
    }
  };

  const handleViewOrders = async () => {
    const session = await api.get(`/sessions/active/${establishmentId}/${tableId}`)

    router.push(`/session/${session.data.id}`)
  }
  
  

  if (tableStatus === 'available') {
      return (
          <div className='flex items-center justify-center min-h-screen flex-col h-full'>
              <p>La mesa está disponible.</p>
              <p>¿Quieres crear una sesión?</p>
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
                <Button onClick={handleOpenPopup} className="bg-red-500 text-white">
                    Finalizar Sesión
                </Button>
                {sessionPopUp && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <p>¿Estás seguro que quieres finalizar esta sesión?</p>
                                <div className="mt-4 flex justify-end">
                                    <Button variant="secondary" onClick={handleClosePopup}>
                                        Cancelar
                                    </Button>
                                    <Button variant="destructive" className="ml-4" onClick={handleEndSession}>
                                        Finalizar sesión
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                <Button onClick={handleViewOrders} className="secondary">
                    Ver mis pedidos
                </Button>
                </div>
                <Menu 
                  establishmentId={+establishmentId} 
                  canEditOrAddProduct={false} 
                  inSession={true}
                  handleSubmitOrder={handleSubmitOrder}
                />
            </div>
          );
      }
  }

  return null;
};
export default TablePage;