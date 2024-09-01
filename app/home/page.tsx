"use client";

import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useProfileData } from '../utils/jwtUtils';
import BarCard from '@/components/ui/barcard';
import { Button } from '@/components/ui/button';

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
    const [limit, setLimit] = useState<number>(12);
    const [offset, setOffset] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        // Cargar los primeros bares al inicio
        fetchBars();
        // Añadir el evento de scroll para cargar más bares al llegar al final de la página
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset, limit]);

    const fetchBars = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/establishments/all?limit=${limit}&offset=0`);
            setBars(response.data);
            if (response.data.length < limit) {
                setHasMore(false);
            }
            
            setOffset(response.data.length); // Establece el siguiente offset para cargar más bares
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bars:', error);
            setLoading(false);
        }
    };

    const fetchMoreBars = async () => {
      console.log(!hasMore, loading);
        
      if (!hasMore || loading) return;

        try {
            setLoading(true);
            const response = await api.get(`/establishments/all?limit=${limit}&offset=${offset}`);
            console.log("ANTES",bars);
            
            setBars((prevBars) => [...prevBars, ...response.data]);
            console.log("DESPUES",bars);
            
            if (response.data.length < limit) {
                setHasMore(false);
            }
            
            setOffset((prevOffset) => prevOffset + limit); // Incrementar el offset
            setLoading(false);
        } catch (error) {
            console.error('Error fetching more bars:', error);
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 && hasMore) {
            fetchMoreBars(); // Cargar más bares al llegar al final
        }
    };

    const handleAddEstablishment = () => {
        window.location.href = '/add-establishment';
    };

    const renderClientView = () => (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cover">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center my-8">Bares Disponibles</h1>
                <div className="flex flex-wrap justify-center">
                    {bars.map(bar => (
                        <BarCard
                            key={bar.id}
                            id={bar.id}
                            name={bar.name}
                            description={bar.description}
                            imageUrl={'https://via.placeholder.com/400x300'}
                            operatingHours={bar.operatingHours}
                            isOwner={false}
                        />
                    ))}
                    {loading && <p>Cargando más bares...</p>}
                    {!hasMore && <p>No hay más bares disponibles.</p>}
                </div>
            </div>
        </div>
    );

    const renderOwnerView = () => (
        <div className="flex flex-col items-center min-h-screen">
            <div className="flex flex-col items-center justify-between w-full p-4 bg-gray-100 border-b">
                <h1 className="text-xl font-bold text-gray-700">Bienvenido, {profileData?.name}</h1>
                <div className="flex justify-between w-full">
                    <Button onClick={handleAddEstablishment}>+ Añadir Establecimiento</Button>
                    <Button onClick={() => {setHasMore(true); setBars([]); fetchBars()}}>Recargar Bares</Button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center mt-8">
                {bars.map(bar => (
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
                {loading && <p>Cargando más bares...</p>}
                {!hasMore && <p>No hay más bares disponibles.</p>}
            </div>
        </div>
    );

    const renderWaiterView = () => (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cover">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center my-8">Panel de Camarero</h1>
                <div className="flex flex-wrap justify-center space-y-4">
                    <Button className="w-full" onClick={() => window.location.href = '/c/ordenes'}>Ver Ordenes</Button>
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
