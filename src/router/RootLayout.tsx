/**
 * RootLayout.tsx
 */

import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { ITrainer } from '../types/ITrainer.ts';

import Navbar from '../components/Navbar/Navbar.tsx';

export default function RootLayout() {

    const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Vérifie si l'utilisateur est sur la page de connexion
     */
    const isLoginPage = location.pathname === '/login';

    /**
     * Redirige vers /login si pas connecté et pas déjà sur la page de connexion
     */
    useEffect(() => {
        if (!selectedTrainer && !isLoginPage) {
            navigate('/login');
        }
    }, [selectedTrainer, isLoginPage, navigate]);

    return (
        <>
            <Navbar selectedTrainer={selectedTrainer} />
            <Outlet context={{ selectedTrainer, setSelectedTrainer }} />
        </>
    );
}