/**
 * PokemonDetailedView.tsx
 *
 * Page de détail complète d'un Pokémon affichant toutes ses informations :
 * - Informations générales (nom, numéro, types, sprite avec toggle shiny)
 * - Statistiques avec barres de progression
 * - Talents (capacités spéciales)
 * - Résistances aux différents types
 * - Chaîne d'évolution complète avec gestion de tous les cas
 *
 * Utilise RTK Query pour récupérer les données de l'API.
 * Gère les états de chargement, d'erreur et les données manquantes.
 */

import { type JSX, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonDetailsByIdQuery } from '../../api/pokemonAPI';
import style from './PokemonDetailedView.module.css';

const PokemonDetailedView = (): JSX.Element => {
    const { pokeId } = useParams<{ pokeId: string }>();
    const navigate = useNavigate();

    // État pour toggle shiny
    const [isShiny, setIsShiny] = useState<boolean>(false);

    // Utilisation de RTK Query
    const {
        data: pokemon,
        isLoading,
        isError,
        error,
    } = useGetPokemonDetailsByIdQuery(Number(pokeId), {
        skip: !pokeId,
    });

    /**
     * Retourne à la liste des Pokémon
     */
    const handleBackToList = () => {
        navigate('/');
    };

    /**
     * Toggle entre sprite normal et shiny
     */
    const toggleShiny = () => {
        setIsShiny(!isShiny);
    };

    /**
     * Vérifie si un Pokémon a une chaîne d'évolution complète
     */
    const hasEvolution = (evolutionData: any): boolean => {
        if (!evolutionData) return false;

        // Vérifie s'il y a une évolution suivante
        if (evolutionData.next && evolutionData.next.length > 0) return true;

        // Vérifie s'il y a une pré-évolution
        if (evolutionData.pre && evolutionData.pre.length > 0) return true;

        return false;
    };

    /**
     * Vérifie si c'est le Pokémon actuel (celui qu'on regarde)
     */
    const isCurrentPokemon = (node: any, currentId: number): boolean => {
        return node.pokedex_id === currentId;
    };

    /**
     * Détermine la classe CSS en fonction du multiplicateur de résistance
     */
    const getResistanceClass = (multiplier: number): string => {
        if (multiplier === 0) return style.immunity;
        if (multiplier < 1) return style.resistant;
        if (multiplier === 1) return style.neutral;
        return style.weak;
    };

    /**
     * Formate l'affichage du multiplicateur de résistance
     */
    const formatMultiplier = (multiplier: number): string => {
        if (multiplier === 0) return 'Immunité';
        return `×${multiplier}`;
    };

    /**
     * Affichage pendant le chargement
     */
    if (isLoading) {
        return (
            <div className={style.page_wrapper}>
                <div className={style.detailed_view_loading}>
                    <div className={style.loading_spinner}></div>
                    <p>Chargement du Pokémon...</p>
                </div>
            </div>
        );
    }

    /**
     * Affichage en cas d'erreur
     */
    if (isError) {
        const errorMessage = error && 'status' in error
            ? `Erreur ${error.status}: Pokémon non trouvé`
            : 'Erreur de chargement';

        return (
            <div className={style.page_wrapper}>
                <div className={style.detailed_view_error}>
                    <div className={style.error_icon}>❌</div>
                    <p>{errorMessage}</p>
                    <p className={style.error_subtitle}>
                        Le Pokémon #{pokeId} n'existe pas dans la base de données.
                    </p>
                    <button onClick={handleBackToList} className={style.action_button}>
                        ← Retour à la liste
                    </button>
                </div>
            </div>
        );
    }

    /**
     * Affichage si aucun Pokémon n'est trouvé
     */
    if (!pokemon) {
        return (
            <div className={style.page_wrapper}>
                <div className={style.detailed_view_empty}>
                    <div className={style.empty_icon}>🔍</div>
                    <p>Aucun Pokémon trouvé</p>
                    <button onClick={handleBackToList} className={style.action_button}>
                        ← Retour à la liste
                    </button>
                </div>
            </div>
        );
    }

    // Détermine l'image à afficher (shiny ou normal)
    const currentSprite = isShiny
        ? pokemon.sprites?.shiny || pokemon.sprites?.regular
        : pokemon.sprites?.regular;

    // Vérifie si le sprite shiny existe
    const hasShinySprite = pokemon.sprites?.shiny && pokemon.sprites.shiny !== pokemon.sprites.regular;

    return (
        <div className={style.page_wrapper}>
            {/* Bouton de retour fixe en haut */}
            <button
                className={style.back_button}
                onClick={handleBackToList}
                aria-label="Retour à la liste des Pokémon"
            >
                ← Retour à la liste
            </button>

            <div className={style.detailed_view_container}>
                {/* ========== SECTION EN-TÊTE ========== */}
                <div className={style.header_section}>
                    <div className={style.sprite_container}>
                        {currentSprite && (
                            <img
                                src={currentSprite}
                                alt={`Sprite ${isShiny ? 'shiny' : 'normal'} de ${pokemon.name?.fr}`}
                                className={`${style.pokemon_sprite} ${isShiny ? style.shiny : ''}`}
                            />
                        )}

                        {/* Bouton toggle shiny */}
                        {hasShinySprite && (
                            <button
                                className={`${style.shiny_toggle} ${isShiny ? style.active : ''}`}
                                onClick={toggleShiny}
                                aria-label={isShiny ? 'Afficher sprite normal' : 'Afficher sprite shiny'}
                                title={isShiny ? 'Sprite Shiny' : 'Sprite Normal'}
                            >
                                <span className={style.toggle_icon}>✨</span>
                                {isShiny ? 'Shiny' : 'Normal'}
                            </button>
                        )}
                    </div>

                    <div className={style.main_info}>
                        <span className={style.pokedex_number}>
                            #{pokemon.pokedex_id.toString().padStart(3, '0')}
                        </span>
                        <h1 className={style.pokemon_name}>
                            {pokemon.name?.fr || 'Nom inconnu'}
                        </h1>
                        {pokemon.name?.en && (
                            <span className={style.pokemon_name_en}>
                                {pokemon.name.en}
                            </span>
                        )}
                        <div className={style.types_container}>
                            {pokemon.types?.map((type, index) => (
                                <span
                                    key={index}
                                    className={style.type_badge}
                                    data-type={type.name.toLowerCase()}
                                >
                                    {type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ========== SECTION STATISTIQUES ========== */}
                {pokemon.stats && (
                    <div className={style.stats_section}>
                        <h2 className={style.section_title}>📊 Statistiques</h2>
                        <div className={style.stats_grid}>
                            {Object.entries(pokemon.stats).map(([statName, statValue]) => (
                                <div key={statName} className={style.stat_item}>
                                    <span className={style.stat_name}>{statName}</span>
                                    <div className={style.stat_bar_container}>
                                        <div
                                            className={style.stat_bar}
                                            style={{ width: `${Math.min((statValue / 255) * 100, 100)}%` }}
                                            title={`${statValue} / 255`}
                                        />
                                    </div>
                                    <span className={style.stat_value}>{statValue}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ========== SECTION TALENTS ========== */}
                {pokemon.talents && pokemon.talents.length > 0 && (
                    <div className={style.talents_section}>
                        <h2 className={style.section_title}>⚡ Talents</h2>
                        <div className={style.talents_list}>
                            {pokemon.talents.map((talent, index) => (
                                <div key={index} className={style.talent_item}>
                                    <span className={style.talent_name}>{talent.name}</span>
                                    {talent.tc && (
                                        <span className={style.talent_tc}>(Talent caché)</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ========== SECTION RÉSISTANCES ========== */}
                {pokemon.resistances && pokemon.resistances.length > 0 && (
                    <div className={style.resistances_section}>
                        <h2 className={style.section_title}>🛡️ Résistances</h2>
                        <div className={style.resistances_grid}>
                            {pokemon.resistances.map((resistance, index) => (
                                <div
                                    key={index}
                                    className={`${style.resistance_item} ${getResistanceClass(resistance.multiplier)}`}
                                >
                                    <span className={style.resistance_type}>
                                        {resistance.name}
                                    </span>
                                    <span className={style.resistance_value}>
                                        {formatMultiplier(resistance.multiplier)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ========== SECTION ÉVOLUTION ========== */}
                {pokemon.evolution && hasEvolution(pokemon.evolution) ? (
                    <div className={style.evolution_section}>
                        <h2 className={style.section_title}>🔄 Évolution</h2>
                        <div className={style.evolution_chain}>
                            {renderEvolutionNode(pokemon.evolution, pokemon.pokedex_id)}
                        </div>
                    </div>
                ) : (
                    <div className={style.evolution_section}>
                        <h2 className={style.section_title}>🔄 Évolution</h2>
                        <div className={style.no_evolution}>
                            <span className={style.no_evolution_icon}>🚫</span>
                            <p className={style.no_evolution_text}>Ce Pokémon n'a pas d'évolution</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    /**
     * Fonction récursive pour afficher la chaîne d'évolution
     * @param node - Nœud d'évolution actuel
     * @param currentPokemonId - ID du Pokémon actuellement consulté
     * @param level - Niveau de profondeur (pour l'indentation)
     */
    function renderEvolutionNode(node: any, currentPokemonId: number, level: number = 0): JSX.Element {
        if (!node) return <></>;

        const isCurrent = isCurrentPokemon(node, currentPokemonId);
        const hasNext = node.next && node.next.length > 0;
        const hasPre = node.pre && node.pre.length > 0;

        return (
            <>
                <div className={style.evolution_node} style={{ marginLeft: `${level * 1.5}rem` }}>
                    {/* Affichage de la pré-évolution si elle existe */}
                    {hasPre && level === 0 && (
                        <div className={style.pre_evolution}>
                            <span className={style.evolution_arrow}>← Évolue de</span>
                            {node.pre.map((preNode: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => navigate(`/pokemon/${preNode.pokedex_id}`)}
                                    className={style.evolution_button}
                                >
                                    <div className={style.evolution_pokemon}>
                                        <div>
                                            <span className={style.evolution_name}>{preNode.name}</span>
                                            <span className={style.evolution_id}> #{preNode.pokedex_id}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Pokémon actuel */}
                    <button
                        onClick={() => !isCurrent && navigate(`/pokemon/${node.pokedex_id}`)}
                        className={style.evolution_button}
                        disabled={isCurrent}
                    >
                        <div className={`${style.evolution_pokemon} ${isCurrent ? style.current_pokemon : ''}`}>
                            <div>
                                <span className={style.evolution_name}>
                                    {node.name}
                                    {isCurrent && <span className={style.current_badge}>(Actuel)</span>}
                                </span>
                                <span className={style.evolution_id}> #{node.pokedex_id}</span>
                            </div>
                            {node.condition && (
                                <span className={style.evolution_condition_inline}>
                                    {node.condition}
                                </span>
                            )}
                        </div>
                    </button>

                    {/* Évolutions suivantes */}
                    {hasNext && (
                        <div className={style.evolution_next}>
                            {node.next.map((nextNode: any, index: number) => (
                                <div key={index}>
                                    {nextNode.condition && (
                                        <span className={style.evolution_condition}>
                                            → {nextNode.condition}
                                        </span>
                                    )}
                                    {renderEvolutionNode(nextNode, currentPokemonId, level + 1)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    }
};

export default PokemonDetailedView;