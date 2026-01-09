import type { IPokemon } from '../../types/IPokemon.ts';

/**
 * Composant carte individuelle pour un Pokémon.
 * Affiche le sprite, le nom, le numéro et les types d'un Pokémon.
 *
 * @param {IPokemon} pokemon - Données du Pokémon à afficher
 * @returns {JSX.Element} Carte du Pokémon
 */
interface PokemonCardProps {
    pokemon: IPokemon;
}

/**
 * Composant carte individuelle pour un Pokémon
 * @param {IPokemon} pokemon - Données du Pokémon à afficher
 */
const PokemonCard = ({ pokemon }: PokemonCardProps) => (
    <div
        style={{
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
            background: 'white'
        }}
    >
        {/* Numéro du Pokédex */}
        <p style={{ color: '#999', fontSize: '0.8rem' }}>
            #{pokemon.pokedex_id.toString().padStart(3, '0')}
        </p>

        {/* Sprite du Pokémon */}
        {pokemon.sprites?.regular && (
            <img
                src={pokemon.sprites.regular}
                alt={`Sprite de ${pokemon.name?.fr || 'Pokémon inconnu'}`}
                style={{ width: '100px', height: '100px' }}
                loading="lazy"
            />
        )}

        {/* Nom du Pokémon */}
        <p>
            <strong>{pokemon.name?.fr || 'Nom inconnu'}</strong>
        </p>

        {/* Types du Pokémon */}
        <div>
            {pokemon.types?.map((type, index: number) => (
                <span
                    key={index}
                    style={{
                        background: '#e5e7eb',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        margin: '0 2px',
                        display: 'inline-block'
                    }}
                >
                    {type.name}
                </span>
            ))}
        </div>
    </div>
);

export default PokemonCard;