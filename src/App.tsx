import HomePage from './components/Home/Home.tsx';

/**
 * Composant principal de l'application de gestion des dresseurs Pokémon
 */
const App = () => {
    return (
        <div className="app">
            <main className="app-content">
                <HomePage />
            </main>
        </div>
    );
};

export default App;