/**
 * RegisterForm.tsx
 * Formulaire d'inscription
 */

import { useState, type FormEvent } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import type { ITrainer } from '../../../types/ITrainer.ts';

import style from './RegisterForm.module.css';

interface OutletContext {
    selectedTrainer: ITrainer | null;
    setSelectedTrainer: (trainer: ITrainer | null) => void;
}

/**
 * Formulaire d'inscription pour les nouveaux dresseurs Pokémon
 */
const RegisterForm = () => {
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

        // Crée le nouveau dresseur et le connecte automatiquement
        setSelectedTrainer(trainer);

        // Redirige vers la page d'accueil
        navigate('/');

        // Réinitialisation du formulaire
        setTrainer({
            trainerName: '',
            trainerPassword: '',
        });
    };

    return (
        <div className={style.register_form_container}>
            <h2>Inscription</h2>
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

                <button type="submit" aria-label="S'inscrire">
                    S'inscrire
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;