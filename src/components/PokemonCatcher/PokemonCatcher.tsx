/**
 * PokemonCatcher.tsx
 * Exemple de composant utilisant le store Redux
 */

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { catchPokemon, releasePokemon } from '../../store/slices/pokemon-slice';
import { selectTrainerPokemon, selectIsPokemonCaught } from '../../store/selectors/pokemon-selectors';
import type { ICaughtPokemon } from '../../types/ICaughtPokemon';

interface PokemonCatcherProps {
    trainerName: string;
    pokemon: {
        pokedexId: number;
        name: string;
        image: string;
        types: string[];
    };
}

const PokemonCatcher = ({ trainerName, pokemon }: PokemonCatcherProps) => {
    const dispatch = useAppDispatch();

    // Vérifie si le Pokémon est déjà capturé
    const isCaught = useAppSelector(selectIsPokemonCaught(trainerName, pokemon.pokedexId));

    // Récupère tous les Pokémon du dresseur
    const trainerPokemon = useAppSelector(selectTrainerPokemon(trainerName));

    /**
     * Capture le Pokémon
     */
    const handleCatch = () => {
        const caughtPokemon: ICaughtPokemon = {
            ...pokemon,
            caughtAt: new Date().toISOString(),
        };
        dispatch(catchPokemon({ trainerName, pokemon: caughtPokemon }));
    };

    /**
     * Relâche le Pokémon
     */
    const handleRelease = () => {
        dispatch(releasePokemon({ trainerName, pokedexId: pokemon.pokedexId }));
    };

    return (
        <div>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.image} alt={pokemon.name} />

            {isCaught ? (
                <button onClick={handleRelease}>Relâcher</button>
            ) : (
                <button onClick={handleCatch}>Capturer</button>
            )}

            <p>Pokémon capturés : {trainerPokemon.length}</p>
        </div>
    );
};

export default PokemonCatcher;