'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import api from '@/app/api/api';
import { useProfileData } from '@/app/utils/jwtUtils';
import Menu from '@/components/ui/menu';

interface Establishment {
  id: number;
  name: string;
  address: string;
  phone: string;
  type: string;
  capacity: number;
  operatingHours: string;
  email: string;
  website: string;
  description: string;
  owner: { id: string };
}

const EstablishmentPage: React.FC = () => {
  const router = useRouter();
  const profileData = useProfileData();
  const { establishmentId: id } = useParams();
  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const canEditOrAddProduct = profileData?.roles === 'ADMIN' || (profileData?.roles === 'OWNER' && establishment?.owner.id === profileData.id);
  const isWaiter = profileData?.establishment?.id == id;
  
  useEffect(() => {
    const fetchEstablishmentData = async () => {
      try {
        const response = await api.get(`/establishments/${id}`);
        setEstablishment(response.data);
      } catch (error) {
        console.error('Error fetching establishment data:', error);
      }
    };

    fetchEstablishmentData();
  }, [id]);

  const handleAddProduct = () => {
    window.location.href = `/e/${id}/add-product`;
  };

  const handleAddWaiter = () => {
    window.location.href = `/e/${id}/add-waiter`;
  };

  const handleEditEstablishment = () => {
    window.location.href = `/e/${id}/edit`;
  };

  const handleViewOrders = () => {
    window.location.href = `/e/${id}/orders`;
  }

  const handleAddTable = async () => {
    try {
      const response = await api.post(`/tables`, { establishmentId: id });

      if (response.status === 201) {
        alert('Mesa añadida correctamente');
      }
    } catch (error) {
      console.error('Error añadiendo la mesa:', error);
      alert('Hubo un problema al añadir la mesa');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className='flex justify-between mb-3'>
        <p className='text-4xl font-semibold'>{establishment?.name}</p>
        <Button variant="secondary" onClick={handleOpenModal}>+ Ver más</Button>
      </div>
      

      {/* Modal de información */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full m-4">
            <h1 className="text-2xl font-bold mb-4">Detalles del Establecimiento</h1>
            {establishment && (
              <div className="mb-8">
                <p><strong>Nombre:</strong> {establishment.name}</p>
                <p><strong>Dirección:</strong> {establishment.address}</p>
                <p><strong>Teléfono:</strong> {establishment.phone}</p>
                <p><strong>Tipo:</strong> {establishment.type}</p>
                <p><strong>Capacidad:</strong> {establishment.capacity}</p>
                <p><strong>Horario:</strong> {establishment.operatingHours}</p>
                <p><strong>Email:</strong> {establishment.email}</p>
                <p><strong>Sitio web:</strong> <a href={establishment.website} target="_blank" rel="noopener noreferrer">{establishment.website}</a></p>
                <p><strong>Descripción:</strong> {establishment.description}</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleCloseModal}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}

{(isWaiter || canEditOrAddProduct) && (
  <div className="flex w-full" style={{marginLeft: -33.33}}>
    {/* Primera columna: Primer botón de cada fila */}
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-1">
      <div className="justify-center m-1">
        <Button onClick={() => router.push(`/e/${id}/tables`)}>Ver mesas</Button>
      </div>
      {canEditOrAddProduct && (
        <>
          <div className="justify-center m-1">
            <Button onClick={handleEditEstablishment}>Editar establecimiento</Button>
          </div>
          <div className=" justify-center m-1">
            <Button onClick={handleAddProduct}>+ Añadir producto</Button>
          </div>
        </>
      )}
    </div>

    {/* Segunda columna: Segundo botón de cada fila */}
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-1">
      <div className=" justify-center m-1">
        <Button onClick={handleAddTable}>+ Añadir mesa</Button>
      </div>
      {canEditOrAddProduct && (
        <>
          <div className=" justify-center m-1">
            <Button onClick={handleAddWaiter}>+ Añadir camarero/a</Button>
          </div>
          <div className="justify-center m-1">
            <Button onClick={handleViewOrders}>Ver pedidos</Button>
          </div>
        </>
      )}
    </div>
  </div>
)}

      
      <Menu establishmentId={Number(id)} canEditOrAddProduct={canEditOrAddProduct} inSession={false} handleSubmitOrder={function (): void {
        throw new Error('Function not implemented.');
      } }/>
    </div>
  );
};

export default EstablishmentPage;
