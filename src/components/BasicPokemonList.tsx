/**
 * BasicPokemonList.tsx
 */

import { useState, useEffect } from 'react';
import { GetPokemonListByAPI } from '../api/TyradexAPI';
import type { IPokemon } from '../types/IPokemon.ts';

/**
 * Composant affichant la liste des Pokémon
 */
const BasicPokemonList = () => {

    // État pour stocker les pokémon
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    // État de chargement
    const [loading, setLoading] = useState(true);

    // État d'erreur
    const [error, setError] = useState<string | null>(null);

    // ⚡ Charge les pokémon au montage du composant
    useEffect(() => {
        const loadPokemons = async () => {
            try {
                setLoading(true);
                const data = await GetPokemonListByAPI(); // Appel de ta fonction
                setPokemons(data); // Stocke les données
                console.log("Pokémon chargés:", data);
            } catch (err) {
                setError("Impossible de charger les Pokémon");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPokemons();
    }, []); // [] = s'exécute une seule fois

    // Affichage pendant le chargement
    if (loading) {
        return <div>Chargement des Pokémon...</div>;
    }

    // Affichage si erreur
    if (error) {
        return <div style={{ color: 'red' }}>Erreur: {error}</div>;
    }

    // Affichage de la liste
    return (
        <div style={{ padding: '20px' }}>
            <h2>Liste des Pokémon ({pokemons.length})</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem'
            }}>
                {pokemons.map((pokemon) => (
                    <div key={pokemon.pokedex_id} style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        background: 'white'
                    }}>
                        <p style={{ color: '#999', fontSize: '0.8rem' }}>
                            #{pokemon.pokedex_id}
                        </p>

                        {pokemon.sprites?.regular && (
                            <img
                                src={pokemon.sprites.regular}
                                alt={pokemon.name?.fr}
                                style={{ width: '100px', height: '100px' }}
                            />
                        )}

                        <p><strong>{pokemon.name?.fr}</strong></p>

                        <div>
                            {pokemon.types?.map((type: IPokemon, index: number) => (
                                <span key={index} style={{
                                    background: '#e5e7eb',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    margin: '0 2px'
                                }}>
                                    {type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BasicPokemonList;