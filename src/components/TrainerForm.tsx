/**
 * TrainerForm.tsx
 */

import React, {useState, type FormEvent} from 'react';
import type { ITrainer } from '../types/ITrainer.ts';

interface TrainerFormProps {
    onAddTrainer: (trainer: ITrainer) => void;
}

/**
 * Formulaire d'enregistrement d'un nouveau dresseur Pokémon
 */
const TrainerForm = ({ onAddTrainer }: TrainerFormProps) => {

    // État local du formulaire
    const [trainer, setTrainer] = useState<ITrainer>({
        trainerName: '',
        trainerStarter: '',
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
        onAddTrainer(trainer);
        // Réinitialisation du formulaire
        setTrainer({
            trainerName: '',
            trainerStarter: '',
        });
    };

    return (
        <>
            <h2>Register trainers</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Nom du dresseur"
                    name="trainerName"
                    value={trainer.trainerName}
                    onChange={handleChange}
                    required
                />
                <input
                    placeholder="Starter du dresseur"
                    name="trainerStarter"
                    value={trainer.trainerStarter}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Ajouter</button>
            </form>
        </>
    )
}

export default TrainerForm;