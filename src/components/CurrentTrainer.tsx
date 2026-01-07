/**
 * CurrentTrainer.tsx
 *
 * Composant affichant les informations du dresseur actuellement sélectionné.
 * Reçoit le dresseur depuis le composant parent (Navbar).
 */

import type { ITrainer } from '../types/ITrainer';
import '../css/CurrentTrainer.css';
import type {JSX} from "react";

/**
 * Props du composant CurrentTrainer
 */
interface CurrentTrainerProps {
    /** Le dresseur actuellement sélectionné, ou null si aucune sélection */
    trainer: ITrainer | null;
}

/**
 * Composant affichant la carte du dresseur actuel
 *
 * @param {CurrentTrainerProps} props - Props du composant
 * @returns {JSX.Element} Carte du dresseur ou message par défaut
 */
const CurrentTrainer = ({ trainer }: CurrentTrainerProps): JSX.Element => {

    // Si aucun dresseur n'est sélectionné, afficher un message
    if (!trainer) {
        return (
            <div className="current-trainer-container empty">
                <p className="empty-message">
                    Aucun dresseur sélectionné
                </p>
            </div>
        );
    }

    // Affichage du dresseur sélectionné
    return (
        <div className="current-trainer-container">
            <div className="trainer-card">
                <div className="trainer-header">
                    <h3>Dresseur actuel</h3>
                </div>

                <div className="trainer-info">
                    <div className="info-row">
                        <span className="label">Nom :</span>
                        <span className="value">{trainer.trainerName}</span>
                    </div>

                    <div className="info-row">
                        <span className="label">Starter :</span>
                        <span className="value">{trainer.trainerStarter}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentTrainer;