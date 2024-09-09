"use client";

import React, { useState, useEffect } from "react";
import api from "@/app/api/api";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ManageUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Usuario seleccionado para editar/eliminar
  const [showEditModal, setShowEditModal] = useState<boolean>(false); // Modal para editar
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // Modal para eliminar
  const [updatedName, setUpdatedName] = useState<string>(""); // Estado para los cambios en el nombre
  const [updatedRole, setUpdatedRole] = useState<string>(""); // Estado para los cambios en el rol

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedRole(user.role);
    setShowEditModal(true);
  };

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;
    try {
      await api.patch(`/users/${selectedUser.id}`, {
        name: updatedName,
        role: updatedRole,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, name: updatedName, role: updatedRole }
            : user
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await api.delete(`/users/${selectedUser.id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <Loader message="Cargando usuarios..." />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Administrar Usuarios</h1>
        <Button onClick={() => alert("Funcionalidad para agregar usuarios")}>+ Añadir Usuario</Button>
      </div>
      {users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-slate-200"
            >
              <div className="mb-2">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p>{user.email}</p>
                <p className="text-gray-600">{user.role}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => handleOpenEditModal(user)}
                  className="flex items-center "
                >
                  <Pencil1Icon className="mr-2 text-blue-500" />
                  <p className="text-blue-500"> Editar </p>
                </Button>
                <Button
                  onClick={() => handleOpenDeleteModal(user)}
                  className="flex items-center "
                >
                  <TrashIcon className="mr-2 text-red-500" />
                  <p className="text-red-500">Eliminar</p>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}

      {/* Modal para Editar Usuario */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Nombre</label>
                <input
                className="border border-gray-300 p-2 rounded w-full"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Rol</label>
                <select
                className="border border-gray-300 p-2 rounded w-full"
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
                >
                <option value="CLIENT">Cliente</option>
                <option value="OWNER">Propietario</option>
                <option value="WAITER">Camarero</option>
                <option value="ADMIN">Administrador</option>
                </select>
            </div>
            <div className="flex justify-end space-x-4">
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancelar
                </Button>
                <Button variant="default" onClick={handleEditUser}>
                Guardar cambios
                </Button>
            </div>
            </div>
        </div>
        )}


      {/* Modal para Eliminar Usuario */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Eliminar Usuario</h2>
            <p>¿Estás seguro que quieres eliminar a {selectedUser.name}?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser}>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;

