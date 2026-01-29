import type { JSX }                 from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState }           from '../../store/store.ts';
import { setGeneration }            from '../../store/slices/generation-slice.ts';
import { GENERATIONS_DATA }         from '../../data/generation.ts';

const GenerationCarousel = (): JSX.Element => {
    const dispatch = useDispatch();
    const activeGen = useSelector((state: RootState) => state.generation.currentGen);

    return (
        <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '10px',
            padding: '15px 0',
            scrollbarWidth: 'none', // Cache la scrollbar sur Firefox
            msOverflowStyle: 'none' // Cache la scrollbar sur IE/Edge
        }}>
            {GENERATIONS_DATA.map((gen) => (
                <button
                    key={gen.generation}
                    onClick={() => dispatch(setGeneration(gen.generation))}
                    style={{
                        flex: '0 0 auto',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: activeGen === gen.generation ? '#3B4CCA' : '#f0f0f0',
                        color: activeGen === gen.generation ? 'white' : '#333',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                >
                    Gen {gen.generation}
                </button>
            ))}
        </div>
    );
};

export default GenerationCarousel;