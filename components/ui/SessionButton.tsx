'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './button';
import { useState } from 'react';

export default function SessionButton() {
    const { data: session } = useSession();
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

    return (
        <>
            {session?.user ? (
                <>
                    <Button variant="destructive" onClick={handleOpenPopup} className='ml-2 mr-2'>Cerrar sesión</Button>
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
                </>
            ) : (
                <Button onClick={() => signIn("google")}>Sign in with Google</Button>
            )}
        </>
    );
}
