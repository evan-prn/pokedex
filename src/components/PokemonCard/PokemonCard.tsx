import { useNavigate } from 'react-router-dom';
import type { IPokemon } from '../../types/IPokemon.ts';
import style from './PokemonCard.module.css';

/**
 * Props du composant PokemonCard
 * @property {IPokemon} pokemon - Données du Pokémon à afficher
 */
interface PokemonCardProps {
    pokemon: IPokemon;
}

/**
 * Composant carte individuelle pour un Pokémon
 * Cliquable pour naviguer vers la page de détail
 */
const PokemonCard = ({ pokemon }: PokemonCardProps) => {

    /**
     * Permet la navigation
     */
    const navigate = useNavigate();

    /**
     * Gère le clic sur la carte
     * Navigue vers la page de détail du Pokémon
     */
    const handleClick = () => {
        navigate(`/pokemon/${pokemon.pokedex_id}`);
    };

    return (
        <div
            className={style.pokemon_card}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label={`Voir les détails de ${pokemon.name?.fr || 'ce Pokémon'}`}
        >
            {/* Numéro du Pokédex */}
            <p className={style.pokedex_number}>
                #{pokemon.pokedex_id.toString().padStart(3, '0')}
            </p>

            {/* Sprite du Pokémon */}
            {pokemon.sprites?.regular && (
                <img
                    src={pokemon.sprites.regular}
                    alt={`Sprite de ${pokemon.name?.fr || 'Pokémon inconnu'}`}
                    className={style.pokemon_sprite}
                    loading="lazy"
                />
            )}

            {/* Nom du Pokémon */}
            <p className={style.pokemon_name}>
                <strong>{pokemon.name?.fr || 'Nom inconnu'}</strong>
            </p>

            {/* Types du Pokémon */}
            <div className={style.pokemon_types}>
                {pokemon.types?.map((type, index: number) => (
                    <span
                        key={index}
                        className={style.type_badge}
                    >
                        {type.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PokemonCard;