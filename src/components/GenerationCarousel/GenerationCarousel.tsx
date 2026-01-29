import { type JSX, useRef } from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks.ts";
import type { RootState } from '../../store/store.ts';
import { setGeneration } from '../../store/slices/generation-slice.ts';
import { useGetGenerationListQuery } from "../../api/pokemonAPI.ts";

import styles from './GenerationCarousel.module.css';

const GenerationCarousel = (): JSX.Element => {
    // Récupération des générations depuis l'API
    const { data: generations = [], isLoading, isError } = useGetGenerationListQuery();

    const dispatch = useAppDispatch();
    const activeGen = useAppSelector((state: RootState) => state.generation.currentGen);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const offset = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    };

    // État de chargement
    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <div className={styles.loading_spinner}></div>
                    <p>Chargement des générations...</p>
                </div>
            </div>
        );
    }

    // État d'erreur
    if (isError) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <span className={styles.error_icon}>❌</span>
                    <p>Erreur de chargement des générations</p>
                </div>
            </div>
        );
    }

    // Si aucune génération n'est disponible
    if (!generations || generations.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <span className={styles.error_icon}>⚠️</span>
                    <p>Aucune génération disponible</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.arrow}
                onClick={() => scroll('left')}
                aria-label="Défiler vers la gauche"
            >
                ‹
            </button>

            <div className={styles.scrollContainer} ref={scrollRef}>
                {generations.map((gen) => (
                    <div
                        key={gen.generation}
                        className={`${styles.card} ${activeGen === gen.generation ? styles.activeCard : ''}`}
                        onClick={() => dispatch(setGeneration(gen.generation))}
                        role="button"
                        tabIndex={0}
                        aria-label={`Sélectionner génération ${gen.generation} - ${gen.region}`}
                        aria-pressed={activeGen === gen.generation}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                dispatch(setGeneration(gen.generation));
                            }
                        }}
                    >
                        <span className={styles.genLabel}>Gen {gen.generation}</span>
                        <span className={styles.regionLabel}>{gen.region}</span>
                    </div>
                ))}
            </div>

            <button
                className={styles.arrow}
                onClick={() => scroll('right')}
                aria-label="Défiler vers la droite"
            >
                ›
            </button>
        </div>
    );
};

export default GenerationCarousel;