import type { RouteObject } from "react-router-dom";

import App                  from '../App';
import RootLayout           from './RootLayout.tsx';
import PokemonDetailedView  from "../components/PokemonDetailedView/PokemonDetailedView.tsx";
import NotFound             from "../components/NotFound/NotFound.tsx";
import LoginForm            from "../components/Auth/LoginForm/LoginForm.tsx";
import RegisterForm         from "../components/Auth/RegisterForm/RegisterForm.tsx";

/**
 *
 */
const myRoutes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: 'pokemon/:pokeId',
                element: <PokemonDetailedView />,
            },
            {
                path: 'login',
                element: <LoginForm />,
            },
            {
                path: 'register',
                element: <RegisterForm />,
            },
            {
                path: '*',
                element: <NotFound />
            }
        ],
    },
];

export default myRoutes;