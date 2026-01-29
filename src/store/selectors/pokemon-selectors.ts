/**
 * pokemon-selectors.ts
 * Sélecteurs pour accéder aux données Pokémon du store
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

/**
 * Sélectionne tous les Pokémon capturés par un dresseur
 */
export const selectTrainerPokemon = (trainerName: string) => (state: RootState) => {
    return state.pokemon.caughtByTrainer[trainerName] || [];
};

/**
 * Sélectionne le nombre de Pokémon capturés par un dresseur
 */
export const selectTrainerPokemonCount = (trainerName: string) =>
    createSelector(
        (state: RootState) => state.pokemon.caughtByTrainer[trainerName],
        (pokemon) => pokemon?.length || 0
    );

/**
 * Vérifie si un Pokémon est déjà capturé par un dresseur
 */
export const selectIsPokemonCaught = (trainerName: string, pokedexId: number) =>
    createSelector(
        (state: RootState) => state.pokemon.caughtByTrainer[trainerName],
        (pokemon) => pokemon?.some((p) => p.pokedexId === pokedexId) || false
    );

/**
 * Sélectionne tous les dresseurs et leur nombre de Pokémon
 */
export const selectAllTrainersStats = createSelector(
    (state: RootState) => state.pokemon.caughtByTrainer,
    (caughtByTrainer) => {
        return Object.entries(caughtByTrainer).map(([trainerName, pokemon]) => ({
            trainerName,
            pokemonCount: pokemon.length,
        }));
    }
);