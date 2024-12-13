'use client'

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  );
}