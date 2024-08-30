"use client"

import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from './button';
import BackButton from './backbutton';
import { useProfileData } from '@/app/utils/jwtUtils';
import Link from 'next/link';

const Header = () => {
  const profileData = useProfileData();

  const handleSignOut = () => {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
      signOut();
    }
  };

  const getRoleClass = (role: string | undefined) => {
    switch (role) {
      case 'CLIENT':
        return 'bg-blue-100';
      case 'WAITER':
        return 'bg-green-100';
      case 'OWNER':
        return 'bg-orange-100';
      case 'ADMIN':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <header className={`flex justify-between items-center p-4 border-b border-gray-300 ${getRoleClass(profileData?.roles)}`}>
      <div className="flex-shrink-0">
      <Link href="/home">
        <h1 className="text-xl font-bold text-gray-700">Buche</h1>
      </Link>
      </div>
      {profileData ? (
        <div className="flex justify-center items-center">
          <BackButton />
          <Button variant="destructive" onClick={() => handleSignOut()}>
            Cerrar sesión
          </Button>
          <div className="flex items-center h-10 w-10 rounded-full mr-4">
            <img src={profileData?.image as string} alt="" className="rounded-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
