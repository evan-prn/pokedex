import {useState, useEffect, type JSX} from 'react';
import type { IPokemon } from '../../types/IPokemon.ts';
import PokemonCard from '../PokemonCard/PokemonCard.tsx';
import styles from './BasicPokemonList.module.css';

/**
 * Props du composant BasicPokemonList
 */
interface BasicPokemonListProps {
    /**
     * Callback appelé en cas d'erreur critique de chargement
     * Déclenche l'affichage du composant LoadingError au niveau parent (App)
     */
    onError?: () => void;
}

/**
 * Composant d'affichage de la liste des Pokémon
 *
 * Récupère la liste complète des Pokémon depuis l'API Tyradex
 * et les affiche sous forme de cartes.
 * En cas d'erreur, remonte l'information au composant parent via onError.
 *
 * @param {BasicPokemonListProps} props - Les props du composant
 * @returns {JSX.Element} La liste des Pokémon ou un état de chargement
 */
const BasicPokemonList = ({ onError }: BasicPokemonListProps): JSX.Element => {
    /**
     * État contenant la liste des Pokémon récupérés
     */
    const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

    /**
     * État indiquant si le chargement est en cours
     */
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /**
     * Effet pour récupérer la liste des Pokémon au montage du composant
     */
    useEffect(() => {
        /**
         * Fonction asynchrone pour récupérer la liste des Pokémon
         * depuis l'API Tyradex
         */
        const fetchPokemon = async () => {
            try {
                setIsLoading(true);

                const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');

                /**
                 * Vérifie si la réponse HTTP est correcte (status 200-299)
                 */
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data: IPokemon[] = await response.json();
                setPokemonList(data);
            } catch (err) {
                /**
                 * En cas d'erreur, appelle le callback onError
                 * pour déclencher l'affichage du LoadingError au niveau App
                 */
                console.error('Erreur lors du chargement des Pokémon:', err);

                if (onError) {
                    onError();
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemon().then();
    }, [onError]);

    /**
     * Affichage du loader pendant le chargement
     */
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loading}>Chargement des Pokémon...</div>
            </div>
        );
    }

    /**
     * Affichage de la liste des Pokémon
     */
    return (
        <div className={styles.pokemonList}>
            {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.pokedex_id} pokemon={pokemon} />
            ))}
        </div>
    );
};

export default BasicPokemonList;