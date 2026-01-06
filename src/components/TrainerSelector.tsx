/**
 * TrainerSelector.tsx
 */

import type {ITrainer} from '../types/ITrainer.ts'

interface TrainerSelectorProps {
    trainers: ITrainer[];
    onSelectTrainer: (trainer: ITrainer) => void;
}

/**
 *
 * @param trainers
 * @param onSelectTrainer
 * @constructor
 */
const TrainerSelector = ({ trainers, onSelectTrainer }: TrainerSelectorProps) => {
    return (
        <>
            <h2>Trainers</h2>
            <select onChange={(e) => {
                const selectedTrainer = trainers[parseInt(e.target.value)];
                if (selectedTrainer) {
                    onSelectTrainer(selectedTrainer);
                }
            }}>
                <option value="">Sélectionner un dresseur</option>
                {trainers.map((trainer, index) => (
                    <option key={index} value={index}>
                        {trainer.trainerName}
                    </option>
                ))}
            </select>
        </>
    )
}

export default TrainerSelector;