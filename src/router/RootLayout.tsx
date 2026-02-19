/**
 * RootLayout.tsx
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { ITrainer } from '../types/ITrainer.ts';

import Navbar from '../components/Navbar/Navbar.tsx';
import Footer from '../components/Footer/Footer.tsx';

export default function RootLayout() {

    const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null);

    /**
     * Gère la déconnexion
     */
    const handleLogout = () => {
        setSelectedTrainer(null);
    };

    return (
        <>
            <Navbar
                selectedTrainer={selectedTrainer}
                onLogout={handleLogout}
            />
            <Outlet context={{ selectedTrainer, setSelectedTrainer }} />
            <footer>
                <Footer />
            </footer>
        </>
    );
}