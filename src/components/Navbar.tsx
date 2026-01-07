/**
 * Navbar.tsx
 */

import { useState } from "react";
import TrainerForm from "./TrainerForm.tsx";
import TrainerSelector from "./TrainerSelector.tsx";
import CurrentTrainer from "./CurrentTrainer.tsx";
import type { ITrainer } from "../types/ITrainer.ts";
import '../css/Navbar.css';

const Navbar = () => {

    /**
     * État contenant la liste complète des dresseurs
     * C'est l'état partagé entre TrainerForm et TrainerSelector
     */
    const [trainers, setTrainers] = useState<ITrainer[]>([]);

    /**
     * État pour le dresseur actuellement sélectionné
     * Null si aucun dresseur n'est sélectionné
     */
    const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null);

    /**
     * Fonction pour ajouter un nouveau dresseur à la liste
     * Appelée par TrainerForm lors de la soumission
     *
     * @param {ITrainer} newTrainer - Le nouveau dresseur à ajouter
     */
    const handleAddTrainer = (newTrainer: ITrainer) => {
        // Ajout du nouveau dresseur à la liste existante
        setTrainers([...trainers, newTrainer]);

        // Log pour debug (peut être retiré en production)
        console.log('Dresseur ajouté:', newTrainer);
        console.log('Liste actuelle:', [...trainers, newTrainer]);
    };

    /**
     * Fonction pour gérer la sélection d'un dresseur
     * Appelée par TrainerSelector lors du changement de sélection
     *
     * @param {ITrainer} trainer - Le dresseur sélectionné
     */
    const handleSelectTrainer = (trainer: ITrainer) => {
        setSelectedTrainer(trainer);
        console.log('Dresseur sélectionné:', trainer);
    };

    return (
        <>
            <nav className="navbar">
                {/* Formulaire d'ajout de dresseur */}
                <TrainerForm onAddTrainer={handleAddTrainer} />

                {/* Sélecteur de dresseur */}
                <TrainerSelector
                    trainers={trainers}
                    onSelectTrainer={handleSelectTrainer}
                    selectedTrainer={selectedTrainer}
                />

                {/* Affichage du dresseur actuel sous la navbar */}
                <CurrentTrainer trainer={selectedTrainer} />
            </nav>


        </>
    );
}

export default Navbar;