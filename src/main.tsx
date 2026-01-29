import { StrictMode }   from 'react'
import { createRoot }   from 'react-dom/client'
import MyRouter         from "./router/MyRouter.tsx"

import { Provider } from 'react-redux'
import { store } from './store/store'
import { loadFromLocalStorage } from './store/slices/pokemon-slice'

import './index.css'

// Charger les données du localStorage au démarrage
const savedState = localStorage.getItem('pokemonStore');
if (savedState) {
    try {
        const parsedState = JSON.parse(savedState);
        store.dispatch(loadFromLocalStorage(parsedState));
    } catch (error) {
        console.error('Erreur lors du chargement depuis localStorage:', error);
    }
}

createRoot(document.getElementById('root')!).render(

    <StrictMode>
        <Provider store={store}>
            <MyRouter />
        </Provider>
    </StrictMode>,
);

