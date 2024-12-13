'use client';

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "./button";
import BackButton from "./backbutton";
import { useProfileData } from "@/app/utils/jwtUtils";
import { EyeOpenIcon, HomeIcon } from '@radix-ui/react-icons';
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

  const getRoleText = (role: string | undefined) => {
    switch (role) {
      case "CLIENT":
        return { text: "", color: "" }; // Solo "Buche", sin color adicional
      case "WAITER":
        return { text: " Waiter", color: "text-green-500" }; // Waiter en verde esmeralda con mayor grosor
      case "OWNER":
        return { text: " Owner", color: "text-yellow-500" }; // Owner en dorado con mayor grosor
      case "ADMIN":
        return { text: " Admin", color: "text-gradient" }; // Admin en multicolor con mayor grosor
      default:
        return { text: 'pending', color: "" };
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
      case "OWNER":
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
      case "ADMIN":
        return (
          <div className="bg-white rounded-lg shadow-lg absolute right-0 mt-6 w-48">
            <Link href={`/session/history/${profileData?.id}`}>
              <p onClick={() => setIsDropdownOpen(false)} className="cursor-pointer hover:bg-gray-100 p-3 rounded">Historial de sesiones</p>
            </Link>

            <div className="bg-gray-300 w-48 h-px"></div>

            <Link href={`/users/manage`}>
              <p onClick={() => setIsDropdownOpen(false)} className="cursor-pointer hover:bg-gray-100 p-3 rounded">Gestionar usuarios</p>
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
      default:
        return null;
    }
  };

  const roleText = getRoleText(profileData?.roles);

  if(roleText.text === 'pending'){
    return <></>
  }

  return (
    <>
      {profileData && (
        <header
          className="flex justify-between items-center p-4 border-b border-gray-300 bg-cover bg-center"
          style={{
            backgroundImage: `url('/background-header.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex-shrink-0">
            <Link href="/home">
              <h1
                onClick={() => setIsDropdownOpen(false)}
                className={''} // Mayor grosor en la fuente
              >
                {/* Mostramos Buche + Rol */}
                <span className="text-3xl font-black">buche</span>{" "}
                <span className={`text-3xl font-extrabold text-with-stroke ${roleText.color}`}>{roleText.text}</span>
              </h1>
            </Link>
          </div>
          {profileData ? (
            <div className="flex items-center">
              {profileData?.roles == 'WAITER' ? (
                <Link href={`/e/${profileData.establishment?.id}/tables`}>
                  <Button variant='secondary' onClick={() => {}}>
                    {/* Icono y texto para pantallas grandes */}
                    <span className="hidden lg:inline">Ver mesas</span>
                    {/* Solo el icono para pantallas pequeñas */}
                    <span className="flex lg:hidden" style={{margin : -6}}
                    ><EyeOpenIcon className="m-0.5"></EyeOpenIcon><p className="">Mesas </p></span>
                  </Button>
                </Link>
              ) : profileData.roles === 'CLIENT' ? (
                <></>
              ) : (
                <Link href="/add-establishment">
                  <Button variant='secondary'  onClick={() => {}}>
                    {/* Icono y texto para pantallas grandes */}
                    <span className="hidden lg:inline">+ Establecimiento</span>
                    {/* Solo el icono para pantallas pequeñas */}
                    <span className="flex lg:hidden" style={{margin : -1}}
                    ><p className="mr-2">+ </p> <HomeIcon className="flex justify-center align-bottom mt-0.5" /></span>
                  </Button>
                </Link>
              )}
              <div
                className="relative h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer ml-2"
                onClick={toggleDropdown}
              >
                {profileData.image ? (
                  <img
                    src={profileData.image as string}
                    alt="?"
                    className="rounded-full h-full w-full object-cover"
                  />
                ) : (
                  <div className="rounded-full h-full w-full flex items-center justify-center bg-gray-400 text-white">
                    ?
                  </div>
                )}
              </div>

              {isDropdownOpen && (
                <div className="relative">{renderDropdownContent()}</div>
              )}

              {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <div className="bg-white p-6 rounded shadow-lg m-4">
                    <p>¿Estás seguro que quieres cerrar sesión?</p>
                    <div className="mt-4 flex justify-around">
                      <Button variant="secondary" onClick={handleClosePopup}>
                        Cancelar
                      </Button>
                      <Button
                        variant="destructive"
                        className="ml-4"
                        onClick={handleSignOut}
                      >
                        Cerrar sesión
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <style jsx>{`
  .text-with-stroke {
    text-shadow:
      -0.5px -0.5px 0 black,  
      0.5px -0.5px 0 black,  
      -0.5px 0.5px 0 black,
      0.5px 0.5px 0 black; 
  }
`}</style>
        </header>
        
      )}
    </>
  );
};

export default Header;
