/**
 * HomePage.tsx
 * Page d'accueil publique de Poké-Tracker
 *
 * Sections :
 * - Hero avec slogan et CTA vers la liste des Pokémons
 * - Statistiques globales de l'application
 * - Pokémons en vedette (chargés depuis la Tyradex API)
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";

/* ── Types ────────────────────────────────────────────────────── */

/** Représente un Pokémon renvoyé par la Tyradex API (champ partiel) */
interface IPokemonCard {
    pokedex_id: number;
    name: { fr: string };
    sprites: { regular: string };
    types: Array<{ name: string; image: string }>;
}

/* ── Constantes ───────────────────────────────────────────────── */

/** IDs des Pokémons affichés en vedette */
const FEATURED_IDS = [25, 6, 149, 9, 3, 1];

/** Statistiques statiques de l'application */
const STATS = [
    { value: "1 008", label: "Pokémons" },
    { value: "9", label: "Générations" },
    { value: "18", label: "Types" },
    { value: "∞", label: "Aventures" },
];

/* ── Composant ────────────────────────────────────────────────── */

const HomePage = () => {
    const [featuredPokemon, setFeaturedPokemon] = useState<IPokemonCard[]>([]);
    const [loading, setLoading] = useState(true);

    /** Charge les Pokémons en vedette depuis l'API */
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const results = await Promise.all(
                    FEATURED_IDS.map((id) =>
                        fetch(`https://tyradex.app/api/v1/pokemon/${id}`).then(
                            (r) => r.json()
                        )
                    )
                );
                setFeaturedPokemon(results);
            } catch (err) {
                console.error("Erreur chargement Pokémons vedette :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <div className={style.page}>

            {/* ── Section Hero ── */}
            <section className={style.hero}>
                <div className={style.hero_bg}>
                    <div className={style.hero_circle} />
                    <div className={style.hero_circle2} />
                </div>

                <div className={style.hero_content}>
                    <span className={style.hero_badge}>✦ Votre Pokédex personnel</span>
                    <h1 className={style.hero_title}>
                        Explorez le monde<br />
                        <span className={style.hero_accent}>Pokémon</span>
                    </h1>
                    <p className={style.hero_subtitle}>
                        Consultez les fiches détaillées de tous les Pokémons,
                        gérez vos dresseurs et partez à l'aventure.
                    </p>
                    <div className={style.hero_actions}>
                        <Link to="/pokemon" className={style.btn_primary}>
                            Voir tous les Pokémons
                        </Link>
                        <Link to="/register" className={style.btn_secondary}>
                            Créer un dresseur
                        </Link>
                    </div>
                </div>

                {/* Pokéball décorative */}
                <div className={style.hero_pokeball} aria-hidden="true">
                    <img src="/pokeball.png" alt="" />
                </div>
            </section>

            {/* ── Section Statistiques ── */}
            <section className={style.stats}>
                {STATS.map((stat) => (
                    <div key={stat.label} className={style.stat_card}>
                        <span className={style.stat_value}>{stat.value}</span>
                        <span className={style.stat_label}>{stat.label}</span>
                    </div>
                ))}
            </section>

            {/* ── Section Pokémons en vedette ── */}
            <section className={style.featured}>
                <div className={style.section_header}>
                    <h2 className={style.section_title}>Pokémons en vedette</h2>
                    <Link to="/pokemons" className={style.section_link}>
                        Voir tout →
                    </Link>
                </div>

                {loading ? (
                    <div className={style.loading_grid}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className={style.skeleton} />
                        ))}
                    </div>
                ) : (
                    <div className={style.pokemon_grid}>
                        {featuredPokemon.map((pokemon) => (
                            <Link
                                to={`/pokemon/${pokemon.pokedex_id}`}
                                key={pokemon.pokedex_id}
                                className={style.pokemon_card}
                            >
                                <span className={style.pokemon_id}>
                                    #{String(pokemon.pokedex_id).padStart(3, "0")}
                                </span>
                                <img
                                    src={pokemon.sprites?.regular}
                                    alt={pokemon.name?.fr}
                                    className={style.pokemon_sprite}
                                />
                                <h3 className={style.pokemon_name}>{pokemon.name?.fr}</h3>
                                <div className={style.pokemon_types}>
                                    {pokemon.types?.map((t) => (
                                        <img
                                            key={t.name}
                                            src={t.image}
                                            alt={t.name}
                                            className={style.type_badge}
                                            title={t.name}
                                        />
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Section CTA final ── */}
            <section className={style.cta}>
                <div className={style.cta_inner}>
                    <h2 className={style.cta_title}>Prêt à devenir Maître Pokémon ?</h2>
                    <p className={style.cta_text}>
                        Créez votre profil de dresseur et commencez à explorer le Pokédex complet.
                    </p>
                    <Link to="/pokemon" className={style.btn_primary}>
                        Commencer l'aventure
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default HomePage;