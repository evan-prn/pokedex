/**
 * TrainerSelector.tsx
 */

import type {ITrainer} from '../../types/ITrainer.ts'
import React, {type JSX} from "react";

import style from './TrainerSelector.module.css';

interface TrainerSelectorProps {

    /** Liste des dresseurs disponibles */
    trainers: ITrainer[];

    /** Callback appelé lors de la sélection d'un dresseur */
    onSelectTrainer: (trainer: ITrainer) => void;

    /** Dresseur actuellement sélectionné (optionnel) */
    selectedTrainer?: ITrainer | null;
}

/**
 * Composant permettant de sélectionner un dresseur dans une liste
 *
 * @param {TrainerSelectorProps} props - Props du composant
 * @returns {JSX.Element} Sélecteur de dresseur
 */
const TrainerSelector = ({trainers, onSelectTrainer, selectedTrainer}: TrainerSelectorProps): JSX.Element => {

    /**
     * Gère le changement de sélection dans le dropdown
     */
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = e.target.value;

        // Trouve le dresseur correspondant dans la liste
        const trainer = trainers.find(t => t.trainerName === selectedName);

        if (trainer) {
            onSelectTrainer(trainer);
        }
    };

    return (
        <div className={style.trainer_selector_container}>
            <label htmlFor={style.trainer_select}>Dresseur :</label>

            <select
                id={style.trainer_select}
                onChange={handleChange}
                value={selectedTrainer?.trainerName || ''}
                disabled={trainers.length === 0}
            >
                <option value="">Sélectionner un dresseur</option>

                {trainers.map((trainer, index) => (
                    <option
                        key={index}
                        value={trainer.trainerName}
                    >
                        {trainer.trainerName} - {trainer.trainerPassword}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TrainerSelector;