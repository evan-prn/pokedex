/**
 * Interface représentant un Pokémon avec l'ensemble de ses caractéristiques.
 * Cette interface structure toutes les données d'un Pokémon provenant du Pokédex.
 */
export interface IPokemon {
    /** Identifiant unique du Pokémon dans le Pokédex national */
    pokedex_id: number;

    /** Numéro de génération d'apparition du Pokémon (1 à 9) */
    generation: number;

    /** Catégorie descriptive du Pokémon (ex: "Pokémon Souris", "Pokémon Graine") */
    category: string;

    /** Noms du Pokémon dans différentes langues */
    name: PokemonName;

    /** URLs des sprites (images) du Pokémon sous différentes formes */
    sprites: PokemonSprites;

    /** Liste des types élémentaires du Pokémon (peut être null si non défini) */
    types: PokemonType[] | null;

    /** Liste des talents/capacités spéciales du Pokémon */
    talents: PokemonTalent[] | null;

    /** Statistiques de combat du Pokémon */
    stats: PokemonStats | null;

    /** Résistances et faiblesses du Pokémon face aux différents types */
    resistances: PokemonResistance[] | null;

    /** Informations sur la chaîne évolutive du Pokémon */
    evolution: PokemonEvolution | null;

    /** Taille du Pokémon (format: "1.2 m") */
    height: string | null;

    /** Poids du Pokémon (format: "25.0 kg") */
    weight: string | null;

    /** Groupes d'œufs pour la reproduction */
    egg_groups: string[] | null;

    /** Répartition des sexes en pourcentage */
    sexe: PokemonSexe | null;

    /** Taux de capture (0-255, plus c'est élevé, plus c'est facile à capturer) */
    catch_rate: number | null;

    /** Nombre de points d'expérience nécessaires pour atteindre le niveau 100 */
    level_100: number | null;

    /** Formes alternatives du Pokémon (Alola, Galar, etc.) - à typer */
    formes: unknown | null;
}

/* ---------- Types secondaires ---------- */

/**
 * Noms du Pokémon dans différentes langues.
 */
export interface PokemonName {
    /** Nom en français */
    fr: string;

    /** Nom en anglais */
    en: string;

    /** Nom en japonais */
    jp: string;
}

/**
 * URLs des sprites (images) du Pokémon.
 */
export interface PokemonSprites {
    /** URL du sprite standard */
    regular: string;

    /** URL du sprite shiny (chromatique) */
    shiny: string | null;

    /** URL du sprite Gigamax */
    gmax: string | null;
}

/**
 * Représente un type élémentaire (Feu, Eau, Plante, etc.).
 */
export interface PokemonType {
    /** Nom du type */
    name: string;

    /** URL de l'icône du type */
    image: string;
}

/**
 * Représente un talent/capacité spéciale du Pokémon.
 */
export interface PokemonTalent {
    /** Nom du talent */
    name: string;

    /** Indique si c'est un talent caché (true) ou normal (false) */
    tc: boolean;
}

/**
 * Statistiques de combat d'un Pokémon.
 * Toutes les valeurs sont des statistiques de base.
 */
export interface PokemonStats {
    /** Points de Vie */
    hp: number;

    /** Attaque physique */
    atk: number;

    /** Défense physique */
    def: number;

    /** Attaque spéciale */
    spe_atk: number;

    /** Défense spéciale */
    spe_def: number;

    /** Vitesse */
    vit: number;
}

/**
 * Résistance ou faiblesse face à un type donné.
 */
export interface PokemonResistance {
    /** Nom du type concerné */
    name: string;

    /** Multiplicateur de dégâts (0.25 = très résistant, 2 = faible, 0 = immunisé) */
    multiplier: number;
}

/**
 * Chaîne évolutive complète du Pokémon.
 */
export interface PokemonEvolution {
    /** Pré-évolution (le Pokémon dont celui-ci évolue) */
    pre: PokemonEvolutionItem | null;

    /** Évolutions suivantes possibles */
    next: PokemonEvolutionItem[] | null;

    /** Méga-évolutions possibles - à typer */
    mega: unknown | null;
}

/**
 * Représente un Pokémon dans une chaîne évolutive.
 */
export interface PokemonEvolutionItem {
    /** ID du Pokémon dans le Pokédex */
    pokedex_id: number;

    /** Nom du Pokémon */
    name: string;

    /** Condition d'évolution (ex: "Niveau 16", "Pierre Feu", "Échange") */
    condition: string;
}

/**
 * Répartition des sexes d'un Pokémon.
 * Les valeurs sont en pourcentage (de 0 à 100).
 */
export interface PokemonSexe {
    /** Pourcentage de mâles */
    male: number;

    /** Pourcentage de femelles */
    female: number;
}