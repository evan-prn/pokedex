/**
 * PokemonList.tsx
 * Page dédiée à la liste des Pokémons (route /pokemon)
 *
 * Affiche :
 * - Le carousel de sélection de génération
 * - Le dresseur actuellement connecté
 * - La liste des Pokémons filtrée par génération
 */

import { useOutletContext } from 'react-router-dom';
import type { ITrainer } from '../../types/ITrainer.ts';
import BasicPokemonList    from '../BasicPokemonList/BasicPokemonList.tsx';
import GenerationCarousel  from '../GenerationCarousel/GenerationCarousel.tsx';
import CurrentTrainer      from '../CurrentTrainer/CurrentTrainer.tsx';
import style               from './PokemonList.module.css';

interface OutletContext {
    selectedTrainer: ITrainer | null;
    setSelectedTrainer: (trainer: ITrainer | null) => void;
}

/**
 * Page listant les Pokémons avec carousel de génération et dresseur connecté
 */
const PokemonList = () => {
    /** Récupère le dresseur sélectionné depuis le contexte du RootLayout */
    const { selectedTrainer } = useOutletContext<OutletContext>();

    return (
        <div className={style.page}>
            <GenerationCarousel />
            <CurrentTrainer trainer={selectedTrainer} />
            <main className={style.content}>
                <BasicPokemonList />
            </main>
        </div>
    );
};

export default PokemonList;