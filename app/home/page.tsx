"use client"

import { useState } from 'react';
import { useProfileData } from '@/app/utils/jwtUtils';
import BarCard from '@/components/ui/barcard';
import { Button } from '@/components/ui/button';
import api from '../api/api';

type Bar = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  operatingHours: string;
};

const Home = () => {
  const profileData = useProfileData();
  const [bars, setBars] = useState<Bar[]>([]);
  const fetchBars = async () => {
    try {
      const response = await api.get('/establishments/owner');
      setBars(response.data);
    } catch (error) {
      console.error('Error fetching bars:', error);
    }
  };

  const handleAddEstablishment = () => {
    window.location.href = '/add-establishment';
  };

  const renderClientView = () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cover">
      <div className="font-comfortaa text-black text-lg">
        Bienvenido, {profileData ? profileData.name : '__________'}.
      </div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">Bares Disponibles</h1>
        <div className="flex flex-wrap justify-center">
          {bars.map((bar, index) => (
            <BarCard
              key={bar.id}
              id={bar.id}
              name={bar.name}
              description={bar.description}
              imageUrl={'https://via.placeholder.com/400x300'}
              operatingHours={bar.operatingHours}
              isOwner={true}
            />
          ))}
        </div>
      </div>
      <div className="z-50">
        <Button className="my-3">Escanear mesa</Button>
      </div>
    </div>
  );

  const renderOwnerView = () => (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex flex-col items-center justify-between w-full p-4 bg-gray-100 border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-700">Bienvenido, {profileData?.name}</h1>
        <div className='flex items-center justify-between'>
          <Button onClick={handleAddEstablishment}>+ Añadir Establecimiento</Button>
          <Button onClick={fetchBars}>Recargar Bares</Button> 
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-8">
        <h1 className="text-xl font-bold text-gray-700">Tus bares</h1>
        {bars.map((bar) => (
          <BarCard
            key={bar.id}
            id={bar.id}
            name={bar.name}
            description={bar.description}
            imageUrl={'https://via.placeholder.com/400x300'}
            operatingHours={bar.operatingHours}
            isOwner={true}
          />
        ))}
      </div>
    </div>
  );

  const renderWaiterView = () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cover">
      <div className="font-comfortaa text-black text-lg">
        Bienvenido, {profileData ? profileData.name : '__________'}.
      </div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">Panel de Camarero</h1>
        <div className="flex flex-wrap justify-center space-y-4">
          <Button className="w-full" onClick={() => window.location.href = '/c/ordenes'}>Ver Órdenes</Button>
          <Button className="w-full" onClick={() => window.location.href = '/c/mesas'}>Ver Mesas</Button>
        </div>
      </div>
    </div>
  );
  

  return (
    <div>
      {profileData?.roles === 'CLIENT' && renderClientView()}
      {profileData?.roles === 'OWNER' && renderOwnerView()}
      {profileData?.roles === 'WAITER' && renderWaiterView()}
    </div>
  );
};

export default Home;
