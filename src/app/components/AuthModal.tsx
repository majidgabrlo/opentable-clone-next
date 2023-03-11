"use client"
import { useState } from 'react';
import AuthSignIn from './AuthSignIn';
import AuthSignUp from './AuthSignUp';
import Modal from './Modal';

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                onClick={handleOpen}
            >
                {isSignIn ? 'Sign in' : 'Sign up'}
            </button>
            {open &&
                <Modal onClose={handleClose}>
                    {isSignIn ? <AuthSignIn handleClose={handleClose} /> : <AuthSignUp handleClose={handleClose} />}
                </Modal>
            }
        </div >
    );
}