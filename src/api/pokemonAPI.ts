import { createApi, fetchBaseQuery }    from "@reduxjs/toolkit/query/react";
import type { IPokemon }                from "../types/IPokemon.ts";

export const pokemonApi = createApi({
    reducerPath: "pokemonAPI",
    basePath: fetchBaseQuery({ baseUrl: "https://tyradex.vercel.app/api/v1/" }),

    endpoints: (builder) => ({
        getPokemonList: builder.query<IPokemon[], number | void> ({
            query: (id) => `pokemon/${id}`,
        }),
    }),
});

export const { useGetPokemonQuery } = pokemonApi;