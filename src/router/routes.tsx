import type { RouteObject } from "react-router-dom";

import App                  from '../App';
import RootLayout           from './RootLayout.tsx';
import PokemonDetailedView  from "../components/PokemonDetailedView/PokemonDetailedView.tsx";
import NotFound             from "../components/NotFound/NotFound.tsx";

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
                path: '*',
                element: <NotFound />
            }
        ],
    },
];

export default myRoutes;