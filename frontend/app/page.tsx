import Head from 'next/head';
import '../app/globals.css'

const Home = () => {
    return (
        <>
        <Head>
            {/* Meta tags para SEO y redes sociales */}
            <title>buche - Tu app de gestión de pedidos</title>
            <meta name="description" content="Gestiona fácilmente tus pedidos con Buche, la mejor herramienta para establecimientos." />

            {/* Open Graph meta tags */}
            <meta property="og:title" content="Buche - Tu app de gestión de pedidos" />
            <meta property="og:description" content="Gestiona fácilmente tus pedidos con Buche, la mejor herramienta para establecimientos." />
            <meta property="og:image" content="https://buche-frontend.vercel.app/buche-template.png"/>
            <meta property="og:url" content="https://buche-frontend.vercel.app" />

            {/* Twitter Card meta tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Buche - Tu app de gestión de pedidos" />
            <meta name="twitter:description" content="Gestiona fácilmente tus pedidos con Buche, la mejor herramienta para establecimientos." />
            <meta name="twitter:image" content="https://buche-frontend.vercel.app/buche-template.png"/>
        </Head>
        </>
    );
};

export default Home;