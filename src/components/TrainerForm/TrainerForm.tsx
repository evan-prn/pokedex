/**
 * TrainerForm.tsx
 */

import React, { useState, type FormEvent } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import type { ITrainer } from '../../types/ITrainer.ts';

import style from './TrainerForm.module.css';

interface OutletContext {
    selectedTrainer: ITrainer | null;
    setSelectedTrainer: (trainer: ITrainer | null) => void;
}

/**
 * Formulaire d'enregistrement d'un nouveau dresseur Pokémon
 */
const TrainerForm = () => {
    const navigate = useNavigate();
    const { setSelectedTrainer } = useOutletContext<OutletContext>();

    // État local du formulaire
    const [trainer, setTrainer] = useState<ITrainer>({
        trainerName: '',
        trainerPassword: '',
    });

    /**
     * Gère les changements de valeur des champs du formulaire
     * @param e - L'événement de changement de l'input
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrainer({
            ...trainer,
            [e.target.name]: e.target.value
        });
    };

    /**
     * Gère la soumission du formulaire
     * @param e - L'événement de soumission du formulaire
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

    return (
        <>
            <div className={style.trainer_form_container}>
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

                    <button type="submit" aria-label="Se connecter">
                        Se connecter
                    </button>
                </form>
            </div>
        </>
    );
}

export default TrainerForm;