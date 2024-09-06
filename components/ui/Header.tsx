"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "./button";
import BackButton from "./backbutton";
import { useProfileData } from "@/app/utils/jwtUtils";
import Link from "next/link";

const Header = () => {
  const profileData = useProfileData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

    const handleSignOut = () => {
        signOut();
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getRoleClass = (role: string | undefined) => {
    switch (role) {
      case "CLIENT":
        return "bg-blue-100";
      case "WAITER":
        return "bg-green-100";
      case "OWNER":
        return "bg-orange-100";
      case "ADMIN":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };


  const renderDropdownContent = () => {
    switch (profileData?.roles) {
      case "CLIENT":
        return (
          <div className="bg-white rounded-lg shadow-lg absolute right-0 mt-6 w-48">
            <Link href={`/session/history/${profileData?.id}`}>
              <p onClick={() => setIsDropdownOpen(false)} className="cursor-pointer hover:bg-gray-100 p-3 rounded">Historial de sesiones</p>
            </Link>
            <div className="bg-gray-300 w-48 h-px"></div>
            <p
              className="cursor-pointer hover:bg-gray-100 p-3 rounded"
              onClick={() => handleOpenPopup()}
            >
              Log Out
            </p>
          </div>
        );
      case "WAITER":
      case "OWNER":
        return (
          <div className="bg-white rounded-lg shadow-lg absolute right-0 mt-2 w-48">
            <Link href="/sessions/active">
              <p className="cursor-pointer hover:bg-gray-100 p-3 rounded">Sesiones Activas</p>
            </Link>
            <p
              className="cursor-pointer hover:bg-gray-100 p-3 rounded"
              onClick={() => handleOpenPopup()}
            >
              Log Out
            </p>
          </div>
        );
      case "ADMIN":
        return (
          <div className="bg-white rounded-lg shadow-lg absolute right-0 mt-2 w-48">
            <p
              className="cursor-pointer hover:bg-gray-100 p-3 rounded"
              onClick={() => handleOpenPopup()}
            >
              Log Out
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (<>
    {profileData  && (<header className={`flex justify-between items-center p-4 border-b border-gray-300 ${getRoleClass(profileData?.roles)}`}>
      <div className="flex-shrink-0">
        <Link href="/home">
          <h1 onClick={() => setIsDropdownOpen(false)} className="text-xl font-bold text-gray-700">Buche</h1>
        </Link>
      </div>
      {profileData ? (
        <div className="flex items-center">
          <BackButton />
          {/* Foto de perfil con fondo circular */}
          <div
            className="relative h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            {profileData.image ? (
              <img
                src={profileData.image as string}
                alt="Profile"
                className="rounded-full h-full w-full object-cover"
              />
            ) : (
              <div className="rounded-full h-full w-full flex items-center justify-center bg-gray-400 text-white">
                ?
              </div>
            )}
          </div>

          {isDropdownOpen && (
            <div className="relative">
              {renderDropdownContent()}
            </div>
          )}
          {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <p>¿Estás seguro que quieres cerrar sesión?</p>
                                <div className="mt-4 flex justify-end">
                                    <Button variant="secondary" onClick={handleClosePopup}>
                                        Cancelar
                                    </Button>
                                    <Button variant="destructive" className="ml-4" onClick={handleSignOut}>
                                        Cerrar sesión
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
        </div>
      ) : null}
    </header>)}
    </>
  );
};

export default Header;
