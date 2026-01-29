/**
 * Navbar.tsx
 * Navbar simplifiée avec juste un bouton de connexion
 */

import { useNavigate } from "react-router-dom";
import type { ITrainer } from "../../types/ITrainer.ts";

import style from './Navbar.module.css';

interface NavbarProps {
    selectedTrainer: ITrainer | null;
}

const Navbar = ({ selectedTrainer }: NavbarProps) => {
    const navigate = useNavigate();

    /**
     * Gère le clic sur le bouton de connexion
     */
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <nav className={style.navbar}>
            <div className={style.navbar_icon}>
                <img src="/pokeball.png" alt="Pokéball icon" />
            </div>

            <h1 className={style.navbar_title}>Poké-Tracker</h1>

            {/* Bouton de connexion uniquement si pas connecté */}
            {!selectedTrainer && (
                <button
                    onClick={handleLoginClick}
                    className={style.login_button}
                    aria-label="Se connecter"
                >
                    Connexion
                </button>
            )}
        </nav>
    );
};

export default Navbar;