import { useState } from "react";
import type { ITrainer } from "./types/ITrainer.ts";

import BasicPokemonList from "./components/BasicPokemonList/BasicPokemonList.tsx";
import CurrentTrainer   from "./components/CurrentTrainer/CurrentTrainer.tsx";
import Navbar           from "./components/Navbar/Navbar.tsx";

import "./api/TyradexAPI.ts";

/**
 * Composant principal de l'application de gestion des dresseurs Pokémon
 */
const App = () => {
  /**
   * État pour le dresseur actuellement sélectionné
   * Null si aucun dresseur n'est sélectionné
   */
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null);

  return (
    <>
      <div className="app">
        {/* Passe le state et le setter à Navbar */}
        <Navbar
          selectedTrainer={selectedTrainer}
          onTrainerSelect={setSelectedTrainer}
        />

        {/* CurrentTrainer est maintenant en dehors et en dessous de la Navbar */}
        <CurrentTrainer trainer={selectedTrainer} />
        <main className="app-content">
          <BasicPokemonList />
        </main>
      </div>
    </>
  );
};

export default App;
