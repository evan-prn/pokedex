/**
 * Navbar.tsx
 * Navbar avec composant AuthButtons
 */
import { Link } from "react-router-dom";
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
            {/* Lien vers l'accueil au clic sur la Pokéball */}
            <Link to="/" className={style.navbar_icon}>
                <img src="/pokeball.png" alt="Pokéball icon" />
            </Link>
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