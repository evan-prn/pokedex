/**
 * @file store.ts
 * @description Configuration du store Redux global de l'application
 * @module Redux/Store
 */

import { configureStore } from '@reduxjs/toolkit';

import pokemonReducer from './slices/pokemon-slice';

/**
 * Store Redux global de l'application
 * @constant
 * @type {Store}
 * @description Configure et centralise l'état global avec tous les reducers de l'application
 */
export const store = configureStore({
    reducer: {
        // Intègre le reducer pour gérer l'état des Pokémon capturés
        pokemonReducer,
    },
});

/**
 * Type TypeScript pour le dispatch du store
 * @typedef {typeof store.dispatch} AppDispatch
 * @description Permet de typer correctement les appels dispatch dans les composants
 * @example
 * const dispatch: AppDispatch = useDispatch();
 * dispatch(addCapturedPokemon(25));
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Type TypeScript représentant l'état complet du store Redux
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @description Infère automatiquement la structure complète de l'état à partir du store
 * @example
 * const capturedIds = useSelector((state: RootState) => state.pokemonReducer.capturedPokemonIds);
 */
export type RootState = ReturnType<typeof store.getState>;