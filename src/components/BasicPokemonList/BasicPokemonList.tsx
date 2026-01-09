/**
 * BasicPokemonList.tsx
 *
 * Composant affichant une grille de cartes Pokémon avec leurs informations de base.
 * Gère automatiquement le chargement des données depuis l'API au montage du composant.
 *
 * @component
 * @example
 * return (
 *   <BasicPokemonList />
 * )
 */

import {useState, useEffect, type JSX} from 'react';
import { GetPokemonListByAPI } from '../../api/TyradexAPI.ts';
import PokemonCard from '../PokemonCard/PokemonCard.tsx'; // ✅ Import default
import type { IPokemon } from '../../types/IPokemon.ts';

/**
 * Composant principal affichant la liste complète des Pokémon sous forme de grille.
 *
 * Fonctionnalités :
 * - Récupération automatique des données au montage
 * - Gestion des états de chargement et d'erreur
 * - Affichage responsive en grille
 * - Carte individuelle pour chaque Pokémon avec sprite, nom et types
 *
 * @returns {JSX.Element} Grille de cartes Pokémon ou état de chargement/erreur
 */
const BasicPokemonList = (): JSX.Element => {

    /** État contenant la liste complète des Pokémon récupérés depuis l'API */
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    /** Indicateur de chargement des données (true pendant le fetch) */
    const [loading, setLoading] = useState<boolean>(true);

    /** Message d'erreur en cas d'échec du chargement, null si pas d'erreur */
    const [error, setError] = useState<string | null>(null);

    /**
     * Effect hook pour charger les Pokémon au montage du composant.
     *
     * Processus :
     * 1. Active l'état de chargement
     * 2. Appelle l'API pour récupérer les données
     * 3. Stocke les données dans le state
     * 4. Gère les erreurs potentielles
     * 5. Désactive l'état de chargement
     *
     * @async
     */
    useEffect(() => {
        const loadPokemons = async () => {
            try {
                // Activation du loader
                setLoading(true);

                // Appel de l'API pour récupérer tous les Pokémon
                const data = await GetPokemonListByAPI();

                // Stockage des données récupérées dans le state
                setPokemons(data);

                // Log de confirmation (peut être retiré en production)
                console.log("Pokémon chargés:", data);
            } catch (err) {
                // Capture et stockage de l'erreur pour affichage utilisateur
                setError("Impossible de charger les Pokémon");
                console.error("Erreur lors du chargement:", err);
            } finally {
                // Désactivation du loader dans tous les cas (succès ou erreur)
                setLoading(false);
            }
        };

        // Exécution de la fonction de chargement
        loadPokemons();
    }, []); // Tableau de dépendances vide = exécution uniquement au montage

    /**
     * Rendu conditionnel : affichage du loader pendant le chargement
     */
    if (loading) {
        return (
            <div role="status" aria-live="polite">
                Chargement des Pokémon...
            </div>
        );
    }

    /**
     * Rendu conditionnel : affichage du message d'erreur en cas d'échec
     */
    if (error) {
        return (
            <div role="alert" style={{ color: 'red' }}>
                Erreur: {error}
            </div>
        );
    }

    /**
     * Rendu principal : grille de cartes Pokémon
     */
    return (
        <div style={{ padding: '20px' }}>
            <h2>Liste des Pokémon ({pokemons.length})</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem'
            }}>
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.pokedex_id}
                        pokemon={pokemon}
                    />
                ))}
            </div>
        </div>
    );
};

export default BasicPokemonList;