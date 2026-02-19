/**
 * Footer.tsx
 * Pied de page de l'application Poké-Tracker
 */
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style.footer}>
            <div className={style.footer_content}>

                {/* Logo et description */}
                <div className={style.footer_brand}>
                    <div className={style.footer_logo}>
                        <img src="/pokeball.png" alt="Pokéball icon" />
                        <span>Poké-Tracker</span>
                    </div>
                    <p className={style.footer_description}>
                        Gérez vos dresseurs et explorez le monde des Pokémon.
                    </p>
                </div>

                {/* Liens de navigation */}
                <nav className={style.footer_nav}>
                    <h3 className={style.footer_nav_title}>Navigation</h3>
                    <ul className={style.footer_nav_list}>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/pokemon">Pokémons</Link></li>
                    </ul>
                </nav>

                {/* Informations API */}
                <div className={style.footer_api}>
                    <h3 className={style.footer_nav_title}>Données</h3>
                    <p>Propulsé par</p>
                    <a
                        href="https://tyradex.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.footer_api_link}
                    >
                        Tyradex API
                    </a>
                </div>

            </div>

            {/* Barre de copyright */}
            <div className={style.footer_bottom}>
                <p>© {currentYear} Poké-Tracker — Projet éducatif, non affilié à Nintendo ou Game Freak.</p>
            </div>
        </footer>
    );
};

export default Footer;