// components/SessionCard.tsx

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SessionCardProps {
  session: {
    id: number;
    startTime: string;
    endTime?: string;
    isActive: boolean;
    table: {number : number, establishmentId : number};
    user : { id : number}
  };
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
    const router = useRouter();

  const handleClick = () => {
    if (session.isActive) {
      // Si la sesión está activa, redirige a la página de la mesa y establecimiento
      router.push(`/e/${session.table.establishmentId}/tables/${session.table.number}`);
    } else {
      // Si la sesión no está activa, redirige al resumen de la sesión
      router.push(`/session/${session.id}/summary`);
    }
  };

  return (
   
        <div onClick={handleClick} className="bg-white shadow-md p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Sesión #{session.id}</h2>
        <p><strong>Mesa:</strong> {session.table.number}</p>
        <p><strong>Establecimiento:</strong> {session.table.establishmentId}</p>
        <p><strong>Inicio:</strong> {new Date(session.startTime).toLocaleString()}</p>
        {session.endTime && <p><strong>Fin:</strong> {new Date(session.endTime).toLocaleString()}</p>}
        <p><strong>Estado:</strong> {session.isActive ? 'Activa' : 'Finalizada'}</p>
        </div>
  );
};

export default SessionCard;
