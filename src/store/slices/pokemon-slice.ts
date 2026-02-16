/**
 * @file pokemonSlice.ts
 * @description Slice Redux pour la gestion des Pokémon capturés par un dresseur
 * @module Redux/Slices
 */

import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

/**
 * Interface définissant la structure de l'état pour les Pokémon capturés
 * @interface PokemonCaptureState
 * @property {number[]} capturedPokemonIds - Tableau contenant les IDs des Pokémon capturés
 */
interface PokemonCaptureState {
    capturedPokemonIds: number[];
}

/**
 * État initial du slice Pokémon
 * @constant
 * @type {PokemonCaptureState}
 * @description Initialise l'application avec aucun Pokémon capturé
 */
const initialState: PokemonCaptureState = {
    capturedPokemonIds: [], // Aucun Pokémon capturé au démarrage
};

/**
 * Slice Redux gérant l'état des Pokémon capturés
 * @constant
 * @description Crée automatiquement les actions et le reducer pour gérer les captures
 */
const pokemonSlice = createSlice({
    name: "pokemon", // Nom du slice utilisé pour préfixer les types d'actions
    initialState,
    reducers: {
        /**
         * Ajoute un Pokémon à la liste des capturés
         * @function addCapturedPokemon
         * @param {PokemonCaptureState} state - L'état actuel du slice
         * @param {PayloadAction<number>} action - Action contenant l'ID du Pokémon à ajouter
         * @returns {void}
         * @description Ajoute l'ID du Pokémon au tableau sans vérifier les doublons
         */
        addCapturedPokemon: (state, action: PayloadAction<number>) => {
            // Ajoute directement l'ID au tableau (Immer gère l'immutabilité)
            state.capturedPokemonIds.push(action.payload);
        },

        /**
         * Retire un Pokémon de la liste des capturés
         * @function removeCapturedPokemon
         * @param {PokemonCaptureState} state - L'état actuel du slice
         * @param {PayloadAction<number>} action - Action contenant l'ID du Pokémon à retirer
         * @returns {void}
         * @description Filtre le tableau pour exclure l'ID spécifié
         */
        removeCapturedPokemon: (state, action: PayloadAction<number>) => {
            // Filtre le tableau pour ne garder que les IDs différents de celui reçu
            state.capturedPokemonIds = state.capturedPokemonIds.filter(
                (id) => id !== action.payload // Garde uniquement les IDs qui ne correspondent pas
            );
        },
    },
});

/**
 * Action creators générés automatiquement par createSlice
 * @exports {Object} actions
 * @property {Function} addCapturedPokemon - Créateur d'action pour ajouter un Pokémon
 * @property {Function} removeCapturedPokemon - Créateur d'action pour retirer un Pokémon
 */
export const {addCapturedPokemon, removeCapturedPokemon} = pokemonSlice.actions;

/**
 * Reducer du slice Pokémon à intégrer dans le store Redux
 * @exports {Function} reducer
 * @default
 * @description Fonction reducer qui gère les transitions d'état pour les Pokémon capturés
 */
export default pokemonSlice.reducer;