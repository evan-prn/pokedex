import { useOutletContext } from 'react-router-dom';
import {type JSX, useState} from 'react';
import type { ITrainer } from "./types/ITrainer.ts";

import BasicPokemonList from "./components/BasicPokemonList/BasicPokemonList.tsx";
import GenerationCarousel from "./components/GenerationCarousel/GenerationCarousel.tsx";
import CurrentTrainer from "./components/CurrentTrainer/CurrentTrainer.tsx";
import LoadingError from "./components/LoadingError/LoadingError.tsx";

interface OutletContext {
    selectedTrainer: ITrainer | null;
    setSelectedTrainer: (trainer: ITrainer | null) => void;
}

/**
 * Composant principal de l'application de gestion des dresseurs Pokémon
 *
 * Gère l'affichage de l'interface principale ou du composant d'erreur
 * en cas d'échec de chargement des données Pokémon.
 *
 * @returns {JSX.Element} L'interface complète ou le composant d'erreur
 */
const App = (): JSX.Element => {
    /**
     * Récupère le dresseur sélectionné depuis le contexte du RootLayout
     */
    const { selectedTrainer } = useOutletContext<OutletContext>();

    /**
     * État pour gérer les erreurs de chargement global
     * Quand true, remplace toute l'interface par le composant LoadingError
     */
    const [hasError, setHasError] = useState<boolean>(false);

    /**
     * Si une erreur critique est détectée, affiche uniquement le composant LoadingError
     * Cela remplace complètement l'interface (carousel, trainer, liste)
     */
    if (hasError) {
        return <LoadingError />;
    }

    /**
     * Affichage normal de l'interface complète
     */
    return (
        <div className="app">
            <GenerationCarousel />
            {/* CurrentTrainer affiche le dresseur connecté */}
            <CurrentTrainer trainer={selectedTrainer} />

            <main className="app-content">
                {/*
          Passe la fonction setHasError à BasicPokemonList
          pour qu'il puisse signaler une erreur critique
          et déclencher l'affichage du LoadingError
        */}
                <BasicPokemonList onError={() => setHasError(true)} />
            </main>
        </div>
    );
};

export default App;