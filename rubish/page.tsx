// pages/home.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import EstablishmentCard from '@/components/establishmentcard';
  

const bares = [
    { id: "1", name: "LA MACHINA" },
    { id: "1", name: "E" },
    { id: "1", name: "LA " },
    { id: "1", name: "kjkjkj" },
    { id: "1", name: "LA MACHINA" },
    { id: "1", name: "E" },
    { id: "1", name: "LA " },
    { id: "1", name: "kjkjkj" },
    // Añade más bares aquí según sea necesario
];


const Home: NextPage = () => {
    return (
        <div className='bg-black'>
            <h1 className="text-white text-2xl font-bold text-center py-4">Mis bares</h1>
            <div className='flex justify-center flex-col items-center'>
                {bares.map(bar => (
                    <EstablishmentCard></EstablishmentCard>
                ))}
            </div>
        </div>
    );
};

export default Home;