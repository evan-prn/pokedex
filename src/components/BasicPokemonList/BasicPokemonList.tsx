import type { JSX } from 'react';
import { useGetPokemonListQuery } from "../../api/pokemonAPI.ts";
import PokemonCard from '../PokemonCard/PokemonCard.tsx';
import Loading from "../Loading/Loading.tsx";

const BasicPokemonList = (): JSX.Element => {
    const { data: pokemons = [], isLoading, isError} = useGetPokemonListQuery();

    if (isLoading) return <Loading />;  // Affiche le composant 'Loading'

    if (isError) {
        return <p style={{ color: 'red' }}>Erreur : {JSON.stringify(isError)}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Pokédex ({pokemons.length})</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem'
            }}>
                {pokemons.length > 0 ? (
                    pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.pokedex_id} pokemon={pokemon} />
                    ))
                ) : (
                    <p>Aucun Pokémon trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default BasicPokemonList;