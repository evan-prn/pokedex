/**
 * CurrentTrainer.tsx
 *
 * Composant affichant les informations du dresseur actuellement sélectionné.
 * Reçoit le dresseur depuis le composant parent (Navbar).
 */
import type {JSX} from "react";
import type { ITrainer } from '../../types/ITrainer';

import style  from '../css/CurrentTrainer.module.css';


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
 * @param {CurrentTrainerProps} props _ Props du composant
 * @returns {JSX.Element} Carte du dresseur ou message par défaut
 */
const CurrentTrainer = ({ trainer }: CurrentTrainerProps): JSX.Element => {
    
    // Si aucun dresseur n'est sélectionné, afficher un message
    if (!trainer) {
        return (
            <div className={`${style.current_trainer_container} ${style.current_trainer_container_empty}`}>
                <p className={style.emptymessage}>
                    Aucun dresseur sélectionné
                </p>
            </div>
        );
    }

    return (
        <div className={style.current_trainer_container}>
            <div className={style.trainer_card}>
                <div className={style.trainer_header}>
                    <h3>Dresseur actuel</h3>
                </div>

                <div className={style.trainer_info}>
                    <div className={style.info_row}>
                        <span className={style.label}>Nom :</span>
                        <span className={style.value}>{trainer.trainerName}</span>
                    </div>

                    <div className={style.info_row}>
                        <span className={style.label}>Starter :</span>
                        <span className={style.value}>{trainer.trainerStarter}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentTrainer;