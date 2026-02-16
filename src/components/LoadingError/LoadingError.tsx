import styles from './LoadingError.module.css';
import { type JSX } from "react";


/**
 * LoadingError Component
 *
 * Displays a compact error message when data loading fails.
 * Features a spinning Pokéball icon and glassmorphism styling.
 *
 * @returns {JSX.Element} The error display component
 */
const LoadingError = (): JSX.Element => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorCard}>
                {/* Pokéball Icon */}
                <div className={styles.iconWrapper}>
                    <svg
                        viewBox="0 0 100 100"
                        className={styles.pokeball}
                        aria-hidden="true"
                    >
                        {/* Top half - Red */}
                        <path
                            d="M 50 10 A 40 40 0 0 1 90 50 L 65 50 A 15 15 0 0 0 50 35 Z"
                            fill="#EF5350"
                        />
                        {/* Bottom half - White */}
                        <path
                            d="M 50 65 A 15 15 0 0 0 65 50 L 90 50 A 40 40 0 0 1 10 50 L 35 50 A 15 15 0 0 0 50 65 Z"
                            fill="#FAFAFA"
                        />
                        {/* Center line - Black */}
                        <line x1="10" y1="50" x2="35" y2="50" stroke="#424242" strokeWidth="3" />
                        <line x1="65" y1="50" x2="90" y2="50" stroke="#424242" strokeWidth="3" />
                        {/* Center button - Outer */}
                        <circle cx="50" cy="50" r="12" fill="#424242" />
                        {/* Center button - Inner */}
                        <circle cx="50" cy="50" r="8" fill="#FAFAFA" />
                        {/* Center button - Core */}
                        <circle cx="50" cy="50" r="4" fill="#424242" />
                    </svg>
                </div>

                {/* Error Message */}
                <h2 className={styles.errorTitle}>Erreur de chargement</h2>
                <p className={styles.errorMessage}>
                    Impossible de charger les données Pokémon.
                </p>

                {/* Retry Button */}
                <button
                    className={styles.retryButton}
                    onClick={() => window.location.reload()}
                    aria-label="Recharger la page"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className={styles.retryIcon}
                        aria-hidden="true"
                    >
                        <path
                            fill="currentColor"
                            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                        />
                    </svg>
                    Réessayer
                </button>
            </div>
        </div>
    );
};

export default LoadingError;