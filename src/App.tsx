import { useState } from 'react'
import type {ITrainer} from './types/ITrainer.ts'

import TrainerForm from "./components/TrainerForm.tsx";
import TrainerSelector from "./components/TrainerSelector.tsx";
import BasicPokemonList from './components/BasicPokemonList';


import './App.css'
import './api/TyradexAPI.ts'


/**
 * Composant principal de l'application de gestion des dresseurs Pokémon
 */
const App = () => {

    // Liste de tous les dresseurs enregistrés
    const [trainers, setTrainers] = useState<ITrainer[]>([]);

    // Dresseur actuellement sélectionné
    const [currentTrainer, setCurrentTrainer] = useState<ITrainer | null>(null);

    /**
     * Ajoute un nouveau dresseur à la liste
     * @param trainer - Le dresseur à ajouter
     */
    const handleAddTrainer = (trainer: ITrainer) => {
        setTrainers([...trainers, trainer]);
    };

    /**
     * Définit le dresseur actuellement sélectionné
     * @param trainer - Le dresseur sélectionné
     */
    const handleSelectTrainer = (trainer: ITrainer) => {
        setCurrentTrainer(trainer);
    };

    return (
        <>
            {/* Affichage du dresseur sélectionné */}
            {currentTrainer && (
                <div>
                    <h2>Current Trainer</h2>
                    <p><strong>{currentTrainer.trainerName}</strong></p>
                    <p>Starter: {currentTrainer.trainerStarter}</p>
                </div>
            )}

            <TrainerForm onAddTrainer={handleAddTrainer} />
            <TrainerSelector trainers={trainers} onSelectTrainer={handleSelectTrainer} />
            <BasicPokemonList />
        </>
    )
}

export default App