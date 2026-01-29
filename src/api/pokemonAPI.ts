import { createApi, fetchBaseQuery }    from "@reduxjs/toolkit/query/react";
import type { IPokemon }                from "../types/IPokemon.ts";
import type { IGenerationList }         from "../types/IGeneration.ts";

export const pokemonAPI = createApi({
    reducerPath: "pokemonAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://tyradex.vercel.app/api/v1/" }),   // Base URL

    /**
     * Liste des endpoints de l'API
     * @param builder
     */
    endpoints: (builder) => ({
        getPokemonList: builder.query<IPokemon[], number | void> ({
            query: () => `pokemon`,
        }),

        getGenerationList: builder.query<IGenerationList[], number | void> ({
            query: () => `gen`
        })
    }),
});

export const { useGetPokemonListQuery, useGetGenerationListQuery } = pokemonAPI;