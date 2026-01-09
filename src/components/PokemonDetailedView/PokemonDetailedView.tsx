/**
 * PokemonDetailedView.tsx
 *
 * Page de détail d'un Pokémon
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetPokemonDetailedById } from '../../api/TyradexAPI';
import type { IPokemon } from '../../types/IPokemon';
import style from './PokemonDetailedView.module.css';

const PokemonDetailedView = () => {
    const { pokeId } = useParams<{ pokeId: string }>();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState<IPokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pokeId) {
            setError('ID du Pokémon manquant');
            setLoading(false);
            return;
        }

        const loadPokemon = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await GetPokemonDetailedById(Number(pokeId));
                setPokemon(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur de chargement');
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPokemon();
    }, [pokeId]);

    const handleBackToList = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className={style.detailed_view_loading}>
                <div className={style.loading_spinner}></div>
                <p>Chargement du Pokémon...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={style.detailed_view_error}>
                <p>❌ {error}</p>
                <button onClick={handleBackToList}>
                    ← Retour à la liste
                </button>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className={style.detailed_view_empty}>
                <p>Aucun Pokémon trouvé</p>
                <button onClick={handleBackToList}>
                    ← Retour à la liste
                </button>
            </div>
        );
    }

    return (
        <div className={style.page_wrapper}>
            <button
                className={style.back_button}
                onClick={handleBackToList}
            >
                ← Retour à la liste
            </button>

            <div className={style.detailed_view_container}>
                <div className={style.header_section}>
                    <div className={style.sprite_container}>
                        {pokemon.sprites?.regular && (
                            <img
                                src={pokemon.sprites.regular}
                                alt={`Sprite de ${pokemon.name?.fr}`}
                                className={style.pokemon_sprite}
                            />
                        )}
                    </div>

                    <div className={style.main_info}>
                        <span className={style.pokedex_number}>
                            #{pokemon.pokedex_id.toString().padStart(3, '0')}
                        </span>
                        <h2 className={style.pokemon_name}>
                            {pokemon.name?.fr || 'Nom inconnu'}
                        </h2>
                        <div className={style.types_container}>
                            {pokemon.types?.map((type, index) => (
                                <span key={index} className={style.type_badge}>
                                    {type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {pokemon.stats && (
                    <div className={style.stats_section}>
                        <h3 className={style.section_title}>Statistiques</h3>
                        <div className={style.stats_grid}>
                            {Object.entries(pokemon.stats).map(([statName, statValue]) => (
                                <div key={statName} className={style.stat_item}>
                                    <span className={style.stat_name}>{statName}</span>
                                    <div className={style.stat_bar_container}>
                                        <div
                                            className={style.stat_bar}
                                            style={{ width: `${(statValue / 255) * 100}%` }}
                                        />
                                    </div>
                                    <span className={style.stat_value}>{statValue}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonDetailedView;