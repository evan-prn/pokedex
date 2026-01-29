import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GENERATIONS_DATA } from "../data/generation.ts";
import type { IPokemon } from "../types/IPokemon.ts";
import type {IGenerationRange} from "../types/IGeneration.ts";

export const pokemonAPI = createApi({
    reducerPath: "pokemonAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://tyradex.vercel.app/api/v1/" }),

    endpoints: (builder) => ({

        getPokemonList: builder.query<IPokemon[], void>({
            query: () => `pokemon`,
        }),

        /**
         * Récupère les Pokémon d'une génération spécifique
         * @param generation - Numéro de la génération (1-9)
         */
        getPokemonByGeneration: builder.query<IPokemon[], number>({
            query: (generation) => `gen/${generation}`,
        }),

        // L'API retourne un tableau, on le garde tel quel
        getPokemonDetailsById: builder.query<IPokemon, number>({
            query: (id) => `pokemon/${id}`,
        }),

        /**
         * Récupère la liste des générations et enrichit avec les noms de régions
         */
        getGenerationList: builder.query<IGenerationRange[], void>({
            query: () => `gen`,
            /**
             * Transforme la réponse de l'API en ajoutant les noms de régions
             */
            transformResponse: (response: Array<{ generation: number; from: number; to: number }>) => {
                // Enrichit chaque génération avec le nom de région depuis GENERATIONS_DATA
                return response.map((gen) => {
                    const regionData = GENERATIONS_DATA.find(
                        (g) => g.generation === gen.generation
                    );

                    return {
                        generation: gen.generation,
                        from: gen.from,
                        to: gen.to,
                        region: regionData?.region || `Génération ${gen.generation}`, // Fallback si région non trouvée
                    };
                });
            },
        }),
    }),
});

export const {
    useGetPokemonListQuery,
    useGetPokemonDetailsByIdQuery,
    useGetPokemonByGenerationQuery,
    useGetGenerationListQuery,
} = pokemonAPI;