/**
 * ICaughtPokemon.ts
 * Interface pour un Pokémon capturé par un dresseur
 */

export interface ICaughtPokemon {
    pokedexId: number;
    name: string;
    image: string;
    types: string[];
    caughtAt: string; // Date de capture (ISO string)
    nickname?: string; // Surnom optionnel donné par le dresseur
}