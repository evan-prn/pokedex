/**
 * Interface représentant la plage de données pour une génération spécifique.
 */
export interface IGenerationRange {
    /** Le numéro de la génération (ex: 1) */
    generation: number;
    /** Le premier ID (Pokedex ID) de cette génération (ex: 1) */
    from: number;
    /** Le dernier ID (Pokedex ID) de cette génération (ex: 151) */
    to: number;
    /** Nom de la région */
    region: string;
}

/**
 * Type représentant la liste complète des générations.
 */
export type IGenerationList = IGenerationRange[];