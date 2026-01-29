/**
 * CatchButton.tsx
 * Bouton pour capturer ou relâcher un Pokémon
 * Avec animations et feedbacks visuels améliorés
 */

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks.ts';
import { catchPokemon, releasePokemon } from '../../../store/slices/pokemon-slice';
import { selectIsPokemonCaught } from '../../../store/selectors/pokemon-selectors';
import type { ICaughtPokemon } from '../../../types/ICaughtPokemon';

import style from './CatchButton.module.css';

interface CatchButtonProps {
    trainerName: string;
    pokemon: {
        pokedexId: number;
        name: string;
        image: string;
        types: string[];
    };
}

/**
 * Bouton permettant de capturer ou relâcher un Pokémon
 * Change d'état automatiquement selon si le Pokémon est déjà capturé
 * Avec animations de succès et sons (optionnels)
 */
const CatchButton = ({ trainerName, pokemon }: CatchButtonProps) => {
    const dispatch = useAppDispatch();

    // État pour l'animation de succès
    const [isAnimating, setIsAnimating] = useState(false);

    // Vérifie si le Pokémon est déjà capturé par ce dresseur
    const isCaught = useAppSelector(selectIsPokemonCaught(trainerName, pokemon.pokedexId));

    /**
     * Gère le clic sur le bouton avec animation
     */
    const handleClick = () => {
        // Déclenche l'animation
        setIsAnimating(true);

        if (isCaught) {
            // Relâche le Pokémon
            dispatch(releasePokemon({
                trainerName,
                pokedexId: pokemon.pokedexId
            }));

            // Feedback visuel console (peut être retiré en production)
            console.log(`🔓 ${pokemon.name} a été relâché !`);
        } else {
            // Capture le Pokémon
            const caughtPokemon: ICaughtPokemon = {
                pokedexId: pokemon.pokedexId,
                name: pokemon.name,
                image: pokemon.image,
                types: pokemon.types,
                caughtAt: new Date().toISOString(),
            };

            dispatch(catchPokemon({
                trainerName,
                pokemon: caughtPokemon
            }));

            // Feedback visuel console (peut être retiré en production)
            console.log(`⚡ ${pokemon.name} a été capturé !`);
        }

        // Réinitialise l'animation après 500ms
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    };

    return (
        <button
            onClick={handleClick}
            className={`${isCaught ? style.release_button : style.catch_button} ${isAnimating ? style.animating : ''}`}
            aria-label={isCaught ? `Relâcher ${pokemon.name}` : `Capturer ${pokemon.name}`}
            disabled={isAnimating}
        >
            {isCaught ? (
                <>
                    <span className={style.icon}>
                        {/* Icône Master Ball pour relâcher */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={style.pokeball_icon}
                        >
                            {/* Master Ball stylisée */}
                            <circle cx="12" cy="12" r="11" fill="#6a0dad" stroke="#000" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="9" fill="#ff1493"/>
                            <rect x="0" y="11" width="24" height="2" fill="#000"/>
                            <circle cx="12" cy="12" r="4" fill="#fff" stroke="#000" strokeWidth="1.5"/>
                            <circle cx="12" cy="12" r="2" fill="#000"/>
                            <text x="12" y="14" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">M</text>
                        </svg>
                    </span>
                    <span className={style.button_text}>Relâcher</span>
                </>
            ) : (
                <>
                    <span className={style.icon}>
                        {/* Icône Pokéball pour capturer */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={style.pokeball_icon}
                        >
                            {/* Pokéball stylisée */}
                            <circle cx="12" cy="12" r="11" fill="#ff0000" stroke="#000" strokeWidth="2"/>
                            <path d="M 1 12 Q 12 18, 23 12" fill="#fff" stroke="#000" strokeWidth="0"/>
                            <rect x="0" y="11" width="24" height="2" fill="#000"/>
                            <circle cx="12" cy="12" r="4" fill="#fff" stroke="#000" strokeWidth="1.5"/>
                            <circle cx="12" cy="12" r="2" fill="#000"/>
                        </svg>
                    </span>
                    <span className={style.button_text}>Capturer</span>
                </>
            )}

            {/* Effet de particules au clic */}
            {isAnimating && (
                <span className={style.particles}>
                    <span className={style.particle}>✨</span>
                    <span className={style.particle}>⚡</span>
                    <span className={style.particle}>✨</span>
                    <span className={style.particle}>⭐</span>
                </span>
            )}
        </button>
    );
};

export default CatchButton;