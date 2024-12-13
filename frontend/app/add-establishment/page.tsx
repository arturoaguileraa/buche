"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "../api/api";
import { useProfileData } from "../utils/jwtUtils";

const AddEstablishment = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("restaurant"); // Default value
  const [capacity, setCapacity] = useState(0);
  const [operatingHours, setOperatingHours] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const user = useProfileData()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/establishments", {
        name,
        address,
        phone,
        type,
        capacity,
        operatingHours,
        email,
        website,
        description
      });
      if (response.status === 201) {
        window.location.pathname = "/home";
      }
    } catch (error) {
      console.error("Error creating establishment:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl mb-4 text-center">Añadir Establecimiento</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo</label>
          <select
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="restaurant">Restaurante</option>
            <option value="bar">Bar</option>
            <option value="cafe">Café</option>
            <option value="bistro">Bistró</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Capacidad</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Horario de operación</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            placeholder="09:00-23:00"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sitio web</label>
          <input
            type="url"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none">
            Añadir Establecimiento
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEstablishment;
