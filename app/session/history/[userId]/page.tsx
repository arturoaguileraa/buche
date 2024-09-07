// app/session/history/[userId]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/app/api/api';
import SessionCard from '@/components/ui/SessionCard';
import Loader from '@/components/ui/loader';

interface Session {
  id: number;
  startTime: string;
  endTime?: string;
  isActive: boolean;
  table: {number : number, establishmentId : number};
  user : { id : number}
}

const SessionHistoryPage: React.FC = () => {
  const { userId } = useParams(); // Obtener el userId de los parámetros de la URL
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Petición al backend para obtener las sesiones del usuario
        const response = await api.get(`/sessions/user/${userId}`);
        console.log(response.data);
        
        setSessions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las sesiones');
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Historial de sesiones</h1>
      {sessions.length === 0 ? (
        <p>No hay sesiones registradas para este usuario.</p>
      ) : (
        sessions.map((session) => <SessionCard key={session.id} session={session} />)
      )}
    </div>
  );
};

export default SessionHistoryPage;
