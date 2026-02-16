import type { JSX } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useGetPokemonByGenerationQuery } from "../../api/pokemonAPI.ts";
import PokemonCard from '../PokemonCard/PokemonCard.tsx';
import Loading from "../Loading/Loading.tsx";

import styles from './BasicPokemonList.module.css';
import LoadingError from "../LoadingError/LoadingError.tsx";

const BasicPokemonList = (): JSX.Element => {
    // Récupère la génération active depuis Redux
    const currentGen = useSelector((state: RootState) => state.generation.currentGen);

    // Appel API filtré par génération
    const {
        data: pokemons = [],
        isLoading,
        isError,
    } = useGetPokemonByGenerationQuery(currentGen);

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <LoadingError />
        );
    }

    return (
        <div className={styles.container}>
            {/* Grille de cartes Pokémon */}
            <div className={styles.grid}>
                {pokemons.length > 0 ? (
                    pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.pokedex_id} pokemon={pokemon} />
                    ))
                ) : (
                    <p className={styles.empty}>Aucun Pokémon trouvé pour cette génération.</p>
                )}
            </div>
        </div>
    );
};

export default BasicPokemonList;