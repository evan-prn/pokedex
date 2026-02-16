import { useOutletContext } from 'react-router-dom';
import type { ITrainer } from "./types/ITrainer.ts";

import BasicPokemonList from "./components/BasicPokemonList/BasicPokemonList.tsx";
import GenerationCarousel from "./components/GenerationCarousel/GenerationCarousel.tsx";
import CurrentTrainer   from "./components/CurrentTrainer/CurrentTrainer.tsx";

interface OutletContext {
    selectedTrainer: ITrainer | null;
    setSelectedTrainer: (trainer: ITrainer | null) => void;
}

/**
 * Composant principal de l'application de gestion des dresseurs Pokémon
 */
const App = () => {
    /**
     * Récupère le dresseur sélectionné depuis le contexte du RootLayout
     */
    const { selectedTrainer } = useOutletContext<OutletContext>();

    return (
        <div className="app">
            <GenerationCarousel />
            {/* CurrentTrainer affiche le dresseur connecté */}
            <CurrentTrainer trainer={selectedTrainer} />


            <main className="app-content">
                <BasicPokemonList />
            </main>
        </div>
    );
};

export default App;