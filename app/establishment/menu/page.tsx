// pages/home.tsx
import ProductCard from '@/components/productcard';
import type { NextPage } from 'next';
import Head from 'next/head';
  

const products = [
    {
        "ID": 1,
        "Name": "Bebidas",
        "Description": "Bebidas refrescantes y nutritivas",
        "Products": [{
          "ID": 1,
          "Name": "Agua",
          "CurrentPrice": 1.00,
          "Description": "Agua natural embotellada",
          "Availability": "Disponible"
        },
        {
          "ID": 2,
          "Name": "Coca Cola",
          "CurrentPrice": 1.50,
          "Description": "Refresco de cola",
          "Availability": "Disponible"
        },
        {
          "ID": 3,
          "Name": "Jugo de naranja",
          "CurrentPrice": 2.00,
          "Description": "Jugo natural exprimido de naranjas frescas",
          "Availability": "Disponible"
        },
        {
          "ID": 4,
          "Name": "Cerveza",
          "CurrentPrice": 2.50,
          "Description": "Cerveza rubia premium",
          "Availability": "Disponible"
        }
      ]
    },
    {
          "ID": 2,
          "Name": "Aperitivos",
          "Description": "Snacks perfectos para acompañar tu bebida favorita",
          "Products": [
          {
            "ID": 5,
            "Name": "Patatas Fritas",
            "CurrentPrice": 1.50,
            "Description": "Patatas crujientes saladas, perfectas como snack",
            "Availability": "Disponible"
          },
          {
            "ID": 6,
            "Name": "Nueces Mixtas",
            "CurrentPrice": 2.00,
            "Description": "Una mezcla saludable de nueces y almendras tostadas",
            "Availability": "Disponible"
          },
          {
            "ID": 7,
            "Name": "Olivas Verdes",
            "CurrentPrice": 1.75,
            "Description": "Olivas verdes marinadas en hierbas y aceite de oliva",
            "Availability": "Disponible"
          }
        ]
      }
  ];


const Home: NextPage = () => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"'>
            <div className="text-black text-2xl font-bold text-center py-4">Mis bares</div>
            {products.map(typeproduct => (
              <>
              <div className='flex justify-center items-center'>{typeproduct.Name}</div>
              <div className='flex justify-center flex-col items-center grid-cols-2'>

                {typeproduct.Products.map(product => (
                  <ProductCard name={product.Name} description={product.Description} currentPrice={product.CurrentPrice}></ProductCard>
                ))}

              </div></>
            ))}
        </div>
    );
};

export default Home;