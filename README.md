# Buche

Buche es una aplicación diseñada para gestionar pedidos, consultar menús y verificar la disponibilidad de mesas en establecimientos. Es ideal para restaurantes, bares y cafeterías que buscan optimizar la interacción con sus clientes y mejorar la gestión de su operación diaria.

## Características principales

- **Gestión de pedidos:** Los usuarios pueden realizar pedidos directamente desde la app.
- **Consulta de menús:** Visualización detallada de los menús disponibles en el establecimiento.
- **Disponibilidad de mesas:** Información en tiempo real sobre la ocupación de las mesas.
- **Multiplataforma:** Acceso desde dispositivos móviles y navegadores web.

## Tecnologías utilizadas

### Frontend
El frontend está desarrollado con **Next.js**, un framework de React que permite:
- Renderizado híbrido (SSR y SSG).
- Navegación rápida y optimizada.
- Uso de TailwindCSS para estilos consistentes y modernos.

### Backend
El backend está implementado en **NestJS**, un framework progresivo de Node.js que proporciona:
- Arquitectura modular y escalable.
- Uso de TypeScript para un desarrollo tipado y más seguro.
- Integración con bases de datos mediante **TypeORM**.

### Base de datos
La base de datos utilizada es **PostgreSQL**, conocida por su robustez y capacidad para manejar grandes volúmenes de datos.

### Comunicación
El frontend y el backend se comunican a través de una API RESTful, diseñada para ser eficiente y segura.

## Instalación y configuración

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/arturoaguileraa/buche
   ```

2. **Instala las dependencias para el frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Instala las dependencias para el backend:**
   ```bash
   cd ../backend
   npm install
   ```

4. **Configura las variables de entorno:**
   - Crea un archivo `.env` en las carpetas `frontend` y `backend` con las configuraciones necesarias.
   - Variables comunes:
     - **Frontend:** Configura la URL del backend.
     - **Backend:** Configura la conexión a PostgreSQL (host, usuario, contraseña, base de datos).

5. **Inicia la aplicación:**
   - Inicia el frontend:
     ```bash
     cd frontend
     npm run dev
     ```
   - Inicia el backend:
     ```bash
     cd ../backend
     npm run start:dev
     ```

6. **Accede a la app:**
   - Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000) para interactuar con el frontend.

## Contribución

Si deseas contribuir al desarrollo de Buche:
1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Envía un pull request describiendo tus cambios.

## Contacto

Para más información o soporte, puedes contactarnos a través de [arturoaguilera.es](https://arturoaguilera.es).

