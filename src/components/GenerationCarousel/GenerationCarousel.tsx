import {type JSX, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState }           from '../../store/store.ts';
import { setGeneration }            from '../../store/slices/generation-slice.ts';
import { GENERATIONS_DATA }         from '../../data/generation.ts';

import styles from './GenerationCarousel.module.css';

const GenerationCarousel = (): JSX.Element => {
    const dispatch = useDispatch();
    const activeGen = useSelector((state: RootState) => state.generation.currentGen);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const offset = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    };

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
                {GENERATIONS_DATA.map((gen) => (
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