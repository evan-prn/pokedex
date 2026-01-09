/**
 * Composant NotFound
 *
 * Page d'erreur 404 affichée lorsque l'utilisateur tente d'accéder à une route inexistante.
 * Propose un design cohérent avec le style glassmorphism de l'application et un lien
 * de retour vers la page d'accueil.
 *
 * @returns {JSX.Element} Page d'erreur 404 stylisée
 */

import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

/**
 *
 * @constructor
 */
const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* Icône Pokéball stylisée pour représenter l'erreur */}
                <div className={styles.icon}>
                    <div className={styles.pokeball}>
                        <div className={styles.pokeballTop}></div>
                        <div className={styles.pokeballCenter}>
                            <div className={styles.pokeballButton}></div>
                        </div>
                        <div className={styles.pokeballBottom}></div>
                    </div>
                </div>

                {/* Code d'erreur et message */}
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Page non trouvée</h2>
                <p className={styles.message}>
                    Oups ! On dirait que ce Pokémon s'est enfui...<br />
                    La page que vous recherchez n'existe pas.
                </p>

                {/* Bouton de retour à l'accueil */}
                <Link to="/" className={styles.button}>
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
};

export default NotFound;