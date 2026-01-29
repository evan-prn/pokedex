import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPokemon } from "../types/IPokemon.ts";
import type { IGenerationList } from "../types/IGeneration.ts";

export const pokemonAPI = createApi({
    reducerPath: "pokemonAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://tyradex.vercel.app/api/v1/" }),

    endpoints: (builder) => ({
        getPokemonList: builder.query<IPokemon[], void>({
            query: () => `pokemon`,
        }),

        // L'API retourne un tableau, on le garde tel quel
        getPokemonDetailsById: builder.query<IPokemon, number>({
            query: (id) => `pokemon/${id}`,
        }),

        getGenerationList: builder.query<IGenerationList[], void>({
            query: () => `gen`,
        }),
    }),
});

export const {
    useGetPokemonListQuery,
    useGetPokemonDetailsByIdQuery,
    useGetGenerationListQuery,
} = pokemonAPI;