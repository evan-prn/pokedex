/**
 * Navbar.tsx
 * Composant de navigation contenant le formulaire et le sélecteur de dresseurs
 */

import { useState } from "react";
import type { ITrainer } from "../types/ITrainer.ts";

import TrainerForm from "./TrainerForm.tsx";
import TrainerSelector from "./TrainerSelector.tsx";

import '../css/Navbar.module.css';

/**
 * Props de la Navbar
 * @property {ITrainer | null} selectedTrainer - Le dresseur actuellement sélectionné
 * @property {function} onTrainerSelect - Callback pour changer le dresseur sélectionné
 */
interface NavbarProps {
    selectedTrainer: ITrainer | null;
    onTrainerSelect: (trainer: ITrainer | null) => void;
}

/**
 * Composant Navbar
 * Gère l'affichage du formulaire de création et du sélecteur de dresseurs
 * Le state selectedTrainer est géré par le parent (App)
 * Le state trainers est géré localement
 */
const Navbar = ({ selectedTrainer, onTrainerSelect }: NavbarProps) => {

    /**
     * État contenant la liste complète des dresseurs
     * C'est l'état partagé entre TrainerForm et TrainerSelector
     */
    const [trainers, setTrainers] = useState<ITrainer[]>([]);

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

    return (
        <nav className="navbar">
            {/* TrainerForm ajoute les dresseurs à la liste locale */}
            <TrainerForm onAddTrainer={handleAddTrainer} />

            {/* TrainerSelector affiche la liste et permet la sélection */}
            <TrainerSelector
                trainers={trainers}
                selectedTrainer={selectedTrainer}
                onSelectTrainer={onTrainerSelect}
            />
        </nav>
    );
}

export default Navbar;