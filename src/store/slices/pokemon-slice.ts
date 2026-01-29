/**
 * pokemon-slice.ts
 * Slice Redux pour gérer les Pokémon capturés par dresseur
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICaughtPokemon } from '../../types/ICaughtPokemon';

/**
 * Structure de l'état :
 * {
 *   "trainerName1": [pokemon1, pokemon2, ...],
 *   "trainerName2": [pokemon3, pokemon4, ...]
 * }
 */
interface PokemonState {
    caughtByTrainer: {
        [trainerName: string]: ICaughtPokemon[];
    };
}

const initialState: PokemonState = {
    caughtByTrainer: {},
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        /**
         * Capture un Pokémon pour un dresseur spécifique
         */
        catchPokemon: (
            state,
            action: PayloadAction<{ trainerName: string; pokemon: ICaughtPokemon }>
        ) => {
            const { trainerName, pokemon } = action.payload;

            // Initialise le tableau si le dresseur n'existe pas encore
            if (!state.caughtByTrainer[trainerName]) {
                state.caughtByTrainer[trainerName] = [];
            }

            // Vérifie si le Pokémon n'est pas déjà capturé
            const alreadyCaught = state.caughtByTrainer[trainerName].some(
                (p) => p.pokedexId === pokemon.pokedexId
            );

            if (!alreadyCaught) {
                state.caughtByTrainer[trainerName].push(pokemon);
            }
        },

        /**
         * Relâche un Pokémon (supprime de la collection du dresseur)
         */
        releasePokemon: (
            state,
            action: PayloadAction<{ trainerName: string; pokedexId: number }>
        ) => {
            const { trainerName, pokedexId } = action.payload;

            if (state.caughtByTrainer[trainerName]) {
                state.caughtByTrainer[trainerName] = state.caughtByTrainer[trainerName].filter(
                    (p) => p.pokedexId !== pokedexId
                );
            }
        },

        /**
         * Renomme un Pokémon capturé
         */
        renamePokemon: (
            state,
            action: PayloadAction<{ trainerName: string; pokedexId: number; nickname: string }>
        ) => {
            const { trainerName, pokedexId, nickname } = action.payload;

            if (state.caughtByTrainer[trainerName]) {
                const pokemon = state.caughtByTrainer[trainerName].find(
                    (p) => p.pokedexId === pokedexId
                );
                if (pokemon) {
                    pokemon.nickname = nickname;
                }
            }
        },

        /**
         * Charge les données depuis le localStorage au démarrage
         */
        loadFromLocalStorage: (state, action: PayloadAction<PokemonState>) => {
            state.caughtByTrainer = action.payload.caughtByTrainer;
        },

        /**
         * Réinitialise tous les Pokémon d'un dresseur
         */
        clearTrainerPokemon: (state, action: PayloadAction<string>) => {
            const trainerName = action.payload;
            delete state.caughtByTrainer[trainerName];
        },
    },
});

export const {
    catchPokemon,
    releasePokemon,
    renamePokemon,
    loadFromLocalStorage,
    clearTrainerPokemon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;