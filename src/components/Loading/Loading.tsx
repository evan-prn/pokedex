import React from "react";
import styles from "./Loading.module.css";

type LoadingProps = {
    message?: string;
    fullscreen?: boolean;
};

const Loading: React.FC<LoadingProps> = ({ message = "Chargement...", fullscreen = false }) => {
    return (
        <div className={`${styles.loadingRoot} ${fullscreen ? styles.fullscreen : ""}`}>
            <div className={styles.pokeballSpinner}>
                <div className={styles.pokeballTop} />
                <div className={styles.pokeballBottom} />
                <div className={styles.pokeballCenter}>
                    <div className={styles.pokeballButton} />
                </div>
            </div>
            <p className={styles.loadingText}>{message}</p>
        </div>
    );
};

export default Loading;
