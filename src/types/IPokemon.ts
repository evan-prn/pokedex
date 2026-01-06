export interface IPokemon {
    pokedex_id: number;
    generation: number;
    category: string;

    name: PokemonName;
    sprites: PokemonSprites;

    types: PokemonType[] | null;
    talents: PokemonTalent[] | null;
    stats: PokemonStats | null;
    resistances: PokemonResistance[] | null;
    evolution: PokemonEvolution | null;

    height: string | null;
    weight: string | null;
    egg_groups: string[] | null;
    sexe: PokemonSexe | null;

    catch_rate: number | null;
    level_100: number | null;
    formes: unknown | null;
}

/* ---------- Sub types ---------- */

export interface PokemonName {
    fr: string;
    en: string;
    jp: string;
}

export interface PokemonSprites {
    regular: string;
    shiny: string | null;
    gmax: string | null;
}

export interface PokemonType {
    name: string;
    image: string;
}

export interface PokemonTalent {
    name: string;
    tc: boolean;
}

export interface PokemonStats {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
}

export interface PokemonResistance {
    name: string;
    multiplier: number;
}

export interface PokemonEvolution {
    pre: PokemonEvolutionItem | null;
    next: PokemonEvolutionItem[] | null;
    mega: unknown | null;
}

export interface PokemonEvolutionItem {
    pokedex_id: number;
    name: string;
    condition: string;
}

export interface PokemonSexe {
    male: number;
    female: number;
}
