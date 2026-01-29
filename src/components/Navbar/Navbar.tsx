/**
 * Navbar.tsx
 * Navbar avec composant AuthButtons
 */

import type { ITrainer } from "../../types/ITrainer.ts";
import AuthButtons from "../Buttons/AuthButton/AuthButton.tsx";

import style from './Navbar.module.css';

interface NavbarProps {
    selectedTrainer: ITrainer | null;
    onLogout: () => void;
}

const Navbar = ({ selectedTrainer, onLogout }: NavbarProps) => {
    return (
        <nav className={style.navbar}>
            <div className={style.navbar_icon}>
                <img src="/pokeball.png" alt="Pokéball icon" />
            </div>

            <h1 className={style.navbar_title}>Poké-Tracker</h1>

            {/* Composant AuthButtons gérant les boutons d'authentification */}
            <AuthButtons
                selectedTrainer={selectedTrainer}
                onLogout={onLogout}
            />
        </nav>
    );
};

export default Navbar;