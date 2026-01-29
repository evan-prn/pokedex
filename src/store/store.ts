/**
 * store.ts
 * Configuration du store Redux avec persistance localStorage
 */

import { configureStore }   from '@reduxjs/toolkit';
import pokemonReducer       from './slices/pokemon-slice';

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
    },
});

/**
 * Sauvegarde automatique dans le localStorage à chaque changement d'état
 */
store.subscribe(() => {
    const state = store.getState();
    try {
        localStorage.setItem('pokemonStore', JSON.stringify(state.pokemon));
    } catch (error) {
        console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
});

/**
 * Types pour TypeScript
 */
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;