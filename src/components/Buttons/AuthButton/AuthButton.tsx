/**
 * AuthButtons.tsx
 * Composant gérant les boutons d'authentification (Connexion, Inscription, Déconnexion)
 */

import { useNavigate } from "react-router-dom";
import type { ITrainer } from "../../../types/ITrainer.ts";

import style from './AuthButton.module.css';

interface AuthButtonsProps {
    selectedTrainer: ITrainer | null;
    onLogout: () => void;
}

const AuthButtons = ({ selectedTrainer, onLogout }: AuthButtonsProps) => {
    const navigate = useNavigate();

    /**
     * Gère le clic sur le bouton de connexion
     */
    const handleLoginClick = () => {
        navigate('/login');
    };

    /**
     * Gère le clic sur le bouton d'inscription
     */
    const handleRegisterClick = () => {
        navigate('/register');
    };

    /**
     * Gère le clic sur le bouton de déconnexion
     */
    const handleLogoutClick = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div className={style.auth_buttons}>
            {selectedTrainer ? (
                /* Si connecté : afficher le bouton de déconnexion */
                <button
                    onClick={handleLogoutClick}
                    className={style.logout_button}
                    aria-label="Se déconnecter"
                >
                    Déconnexion
                </button>
            ) : (
                /* Si non connecté : afficher les boutons connexion et inscription */
                <>
                    <button
                        onClick={handleLoginClick}
                        className={style.login_button}
                        aria-label="Se connecter"
                    >
                        Connexion
                    </button>
                    <button
                        onClick={handleRegisterClick}
                        className={style.register_button}
                        aria-label="S'inscrire"
                    >
                        Inscription
                    </button>
                </>
            )}
        </div>
    );
};

export default AuthButtons;