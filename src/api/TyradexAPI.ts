/**
 * TyradexAPI.ts
 *
 * Fonctions pour interagir avec l'API Tyradex
 * BASE URL: 'https://tyradex.vercel.app/api/v1'
 */

import type { IPokemon } from '../types/IPokemon';

/**
 * URL de base de l'API Tyradex
 */
const BASE_URL = 'https://tyradex.vercel.app/api/v1';

/**
 * Récupère la liste complète des Pokémon depuis l'API
 * @returns {Promise<IPokemon[]>} Liste de tous les Pokémon
 * @throws {Error} Si la requête échoue
 */
export async function GetPokemonListByAPI(): Promise<IPokemon[]> {
    try {
        const res = await fetch(`${BASE_URL}/pokemon`);

        if (!res.ok) {
            throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
        }

        const json: IPokemon[] = await res.json();

        console.log(`✅ ${json.length} Pokémon chargés depuis l'API`);
        return json;

    } catch (err) {
        console.error('❌ Erreur lors du chargement de la liste des Pokémon:', err);
        throw err;
    }
}

/**
 * Récupère les détails d'un Pokémon spécifique par son ID
 * @param {number} pokemonId - L'ID du Pokémon dans le Pokédex
 * @returns {Promise<IPokemon>} Les détails complets du Pokémon
 * @throws {Error} Si la requête échoue ou si le Pokémon n'existe pas
 */
export async function GetPokemonDetailedById(pokemonId: number): Promise<IPokemon> {
    try {
        // ✅ CORRECTION: Ajout du slash entre l'URL et l'ID
        const res = await fetch(`${BASE_URL}/pokemon/${pokemonId}`);

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error(`Pokémon #${pokemonId} introuvable`);
            }
            throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
        }

        const json: IPokemon = await res.json();

        console.log(`✅ Pokémon #${pokemonId} chargé:`, json.name?.fr);
        return json;

    } catch (err) {
        console.error(`❌ Erreur lors du chargement du Pokémon #${pokemonId}:`, err);
        throw err;
    }
}

/**
 * Récupère un Pokémon par son nom (français ou anglais)
 * @param {string} pokemonName - Le nom du Pokémon
 * @returns {Promise<IPokemon>} Les détails du Pokémon
 * @throws {Error} Si la requête échoue
 */
export async function GetPokemonByName(pokemonName: string): Promise<IPokemon> {
    try {
        const res = await fetch(`${BASE_URL}/pokemon/${pokemonName.toLowerCase()}`);

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error(`Pokémon "${pokemonName}" introuvable`);
            }
            throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
        }

        const json: IPokemon = await res.json();

        console.log(`✅ Pokémon "${pokemonName}" chargé:`, json.name?.fr);
        return json;

    } catch (err) {
        console.error(`❌ Erreur lors du chargement de "${pokemonName}":`, err);
        throw err;
    }
}