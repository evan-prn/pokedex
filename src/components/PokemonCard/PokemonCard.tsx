import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import type { IPokemon } from '../../types/IPokemon.ts';
import type { ITrainer } from '../../types/ITrainer.ts';
import CatchButton from '../Buttons/CatchButton/CatchButton.tsx';
import style from './PokemonCard.module.css';

interface OutletContext {
    selectedTrainer: ITrainer | null;
    setSelectedTrainer: (trainer: ITrainer | null) => void;
}

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
 * Affiche un bouton de capture si un dresseur est connecté
 */
const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const navigate = useNavigate();

    // Récupère le contexte (peut être undefined si pas dans un Outlet)
    let selectedTrainer: ITrainer | null = null;
    try {
        const context = useOutletContext<OutletContext>();
        selectedTrainer = context.selectedTrainer;
    } catch {
        // Pas dans un contexte Outlet, selectedTrainer reste null
    }

    /**
     * Gère le clic sur la carte (zone cliquable uniquement)
     * Navigue vers la page de détail du Pokémon
     */
    const handleCardClick = () => {
        navigate(`/pokemon/${pokemon.pokedex_id}`);
    };

    /**
     * Empêche la propagation du clic sur le bouton de capture
     * pour éviter de naviguer vers la page de détail
     */
    const handleButtonAreaClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    /**
     * Prépare les données du Pokémon pour le CatchButton
     */
    const pokemonForCatch = {
        pokedexId: pokemon.pokedex_id,
        name: pokemon.name?.fr || 'Pokémon inconnu',
        image: pokemon.sprites?.regular || '',
        types: pokemon.types?.map(type => type.name) || []
    };

    return (
        <div className={style.pokemon_card}>
            {/* Zone cliquable pour la navigation */}
            <div
                className={style.pokemon_card_content}
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                aria-label={`Voir les détails de ${pokemon.name?.fr || 'ce Pokémon'}`}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleCardClick();
                    }
                }}
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

            {/* Bouton de capture (zone non cliquable pour la navigation) */}
            {selectedTrainer && (
                <div
                    className={style.pokemon_actions}
                    onClick={handleButtonAreaClick}
                >
                    <CatchButton
                        trainerName={selectedTrainer.trainerName}
                        pokemon={pokemonForCatch}
                    />
                </div>
            )}
        </div>
    );
};

export default PokemonCard;