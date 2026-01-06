/**
 * TyradexAPI.ts
 *
 * BASE URL 'https://tyradex.vercel.app/api/v1'
 */

/**
 * Récupère la liste complète des Pokémon
 * @returns Promise<any[]> - Liste des Pokémon
 */
export async function GetPokemonListByAPI() {

    /** Essaie d'execute la requete API */
    try {
        const res = await fetch("https://tyradex.vercel.app/api/v1/pokemon");

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();

        return json;
    /** Attrape l'erreur */
    } catch (err) {
        console.error(err);
        throw err; // Relancer l'erreur pour la gérer dans le composant
    }
}