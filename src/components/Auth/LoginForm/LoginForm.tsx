/**
 * LoginForm.tsx
 * Formulaire de connexion avec liens vers inscription et récupération
 */

import { useState, type FormEvent } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import type { ITrainer } from '../../../types/ITrainer.ts';

import style from './LoginForm.module.css';

interface OutletContext {
    selectedTrainer: ITrainer | null;
    setSelectedTrainer: (trainer: ITrainer | null) => void;
}

/**
 * Formulaire de connexion pour les dresseurs Pokémon
 */
const LoginForm = () => {
    const navigate = useNavigate();
    const { setSelectedTrainer } = useOutletContext<OutletContext>();

    // État local du formulaire
    const [trainer, setTrainer] = useState<ITrainer>({
        trainerName: '',
        trainerPassword: '',
    });

    /**
     * Gère les changements de valeur des champs du formulaire
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrainer({
            ...trainer,
            [e.target.name]: e.target.value
        });
    };

    /**
     * Gère la soumission du formulaire
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Met à jour le dresseur sélectionné dans le contexte parent
        setSelectedTrainer(trainer);

        // Redirige vers la page d'accueil
        navigate('/');

        // Réinitialisation du formulaire
        setTrainer({
            trainerName: '',
            trainerPassword: '',
        });
    };

    /**
     * Redirige vers la page d'inscription
     */
    const handleRegisterClick = () => {
        navigate('/register');
    };

    /**
     * Gère le clic sur "Mot de passe oublié"
     */
    const handleForgotPasswordClick = () => {
        // TODO: Implémenter la logique de récupération de mot de passe
        alert('Fonctionnalité "Mot de passe oublié" à venir ! 🔑');
        // navigate('/forgot-password'); // Route à créer plus tard
    };

    return (
        <div className={style.login_form_container}>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom du dresseur"
                    name="trainerName"
                    value={trainer.trainerName}
                    onChange={handleChange}
                    required
                    aria-label="Nom du dresseur"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    name="trainerPassword"
                    value={trainer.trainerPassword}
                    onChange={handleChange}
                    required
                    aria-label="Mot de passe"
                />

                {/* Lien mot de passe oublié */}
                <div className={style.forgot_password_link}>
                    <button
                        type="button"
                        onClick={handleForgotPasswordClick}
                        className={style.text_button}
                        aria-label="Mot de passe oublié"
                    >
                        Mot de passe oublié ?
                    </button>
                </div>

                <button type="submit" aria-label="Se connecter">
                    Se connecter
                </button>

                {/* Divider */}
                <div className={style.divider}>
                    <span>ou</span>
                </div>

                {/* Lien vers inscription */}
                <div className={style.register_link}>
                    <span className={style.register_text}>Pas encore de compte ?</span>
                    <button
                        type="button"
                        onClick={handleRegisterClick}
                        className={style.register_button}
                        aria-label="Créer un compte"
                    >
                        S'inscrire
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;