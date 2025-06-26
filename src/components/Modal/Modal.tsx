'use client';

import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center
                 bg-transparent"              // ■ прозрачный фон :contentReference[oaicite:0]{index=0}
            onClick={onClose}
        >
            <div
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl
                   max-w-lg w-full p-6 transition-all duration-300
                   opacity-0 translate-y-4 animate-fade-in"
                onClick={e => e.stopPropagation()}
            >
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-grey-500 text-white rounded
                     hover:bg-grey-400 transition"
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
};
