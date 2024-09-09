import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Header from "@/components/ui/Header";
import { Comfortaa } from 'next/font/google'; // Importa la fuente

const comfortaa = Comfortaa({ weight: ['400', '700'], subsets: ['latin'] }); // Configura los pesos y subsets que necesitas

export const metadata: Metadata = {
  title: "Buche - Tu app de gestión de pedidos",
  description: "Gestiona fácilmente tus pedidos con Buche, la mejor herramienta para establecimientos.",
  openGraph: {
    url : "https://buche-frontend.vercel.app/", 
    siteName : "Buche - Tu app de gestión de pedidos", 
    description : "Gestiona fácilmente tus pedidos con Buche, la mejor herramienta para establecimientos.",
    images : [{url : "https://buche-frontend.vercel.app/buche-template.png"}]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <Providers>
          <Header></Header>
          {children}
        </Providers>
        </body>
    </html>
  );
}

