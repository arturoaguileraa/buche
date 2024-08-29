'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./button";

export default function SessionButton() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
      signOut();
    }
  };
  return (
    <>
      {session?.user ? (
         <Button variant="destructive" onClick={handleSignOut}>Sign out</Button>
      ) : (
          <Button onClick={() => signIn("google")}>Sign in with Google</Button>
      )}
    </>
  );
}