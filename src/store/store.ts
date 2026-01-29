import { configureStore } from '@reduxjs/toolkit';
import { pokemonAPI } from '../api/pokemonAPI';
import pokemonReducer from './slices/pokemon-slice';
import generationReducer from './slices/generation-slice';

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        generation: generationReducer, // ✅ On l'ajoute ici
        [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;