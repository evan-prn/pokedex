/**
 * Interface représentant un dresseur Pokémon
 */
interface ITrainer {
    /** Nom du dresseur */
    trainerName: string;

    /** Pokémon de départ du dresseur */
    trainerPassword: string;
}

export type { ITrainer };