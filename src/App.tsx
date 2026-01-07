import BasicPokemonList from './components/BasicPokemonList';
import Navbar from "./components/Navbar.tsx";

import './App.css'
import './api/TyradexAPI.ts'


/**
 * Composant principal de l'application de gestion des dresseurs Pokémon
 */
const App = () => {
    return (
        <>
            <div className="app">
                <Navbar />

                <main className="app-content">
                    <BasicPokemonList />
                </main>
            </div>
        </>
    )
}

export default App