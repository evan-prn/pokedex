/**
 * RegisterForm.tsx
 * Formulaire d'inscription complet avec validation
 */

import { useState, type FormEvent } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import type { ITrainer } from '../../../types/ITrainer.ts';

import style from './RegisterForm.module.css';

interface OutletContext {
    selectedTrainer: ITrainer | null;
    setSelectedTrainer: (trainer: ITrainer | null) => void;
}

/**
 * Interface étendue pour le formulaire d'inscription
 */
interface RegisterFormData extends ITrainer {
    email: string;
    confirmPassword: string;
}

/**
 * Formulaire d'inscription pour les nouveaux dresseurs Pokémon
 */
const RegisterForm = () => {
    const navigate = useNavigate();
    const { setSelectedTrainer } = useOutletContext<OutletContext>();

    // État local du formulaire
    const [formData, setFormData] = useState<RegisterFormData>({
        trainerName: '',
        trainerPassword: '',
        email: '',
        confirmPassword: '',
    });

    // État pour les erreurs
    const [errors, setErrors] = useState<{
        password?: string;
        email?: string;
    }>({});

    /**
     * Gère les changements de valeur des champs du formulaire
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Réinitialise les erreurs lors de la modification
        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    /**
     * Valide le formulaire
     */
    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};

        // Validation du mot de passe
        if (formData.trainerPassword !== formData.confirmPassword) {
            newErrors.password = 'Les mots de passe ne correspondent pas';
        }

        // Validation de l'email (basique)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Gère la soumission du formulaire
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation avant soumission
        if (!validateForm()) {
            return;
        }

        // Crée le nouveau dresseur (sans email et confirmPassword pour l'instant)
        const newTrainer: ITrainer = {
            trainerName: formData.trainerName,
            trainerPassword: formData.trainerPassword,
        };

        // Connecte automatiquement le nouveau dresseur
        setSelectedTrainer(newTrainer);

        // Redirige vers la page d'accueil
        navigate('/');

        // Réinitialisation du formulaire
        setFormData({
            trainerName: '',
            trainerPassword: '',
            email: '',
            confirmPassword: '',
        });
    };

    /**
     * Redirige vers la page de connexion
     */
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className={style.register_form_container}>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom du dresseur"
                    name="trainerName"
                    value={formData.trainerName}
                    onChange={handleChange}
                    required
                    aria-label="Nom du dresseur"
                />

                <div className={style.input_wrapper}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-label="Email"
                        className={errors.email ? style.input_error : ''}
                    />
                    {errors.email && (
                        <span className={style.error_message}>{errors.email}</span>
                    )}
                </div>

                <div className={style.input_wrapper}>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        name="trainerPassword"
                        value={formData.trainerPassword}
                        onChange={handleChange}
                        required
                        aria-label="Mot de passe"
                        className={errors.password ? style.input_error : ''}
                    />
                </div>

                <div className={style.input_wrapper}>
                    <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        aria-label="Confirmer le mot de passe"
                        className={errors.password ? style.input_error : ''}
                    />
                    {errors.password && (
                        <span className={style.error_message}>{errors.password}</span>
                    )}
                </div>

                <button type="submit" aria-label="S'inscrire">
                    S'inscrire
                </button>

                {/* Divider */}
                <div className={style.divider}>
                    <span>ou</span>
                </div>

                {/* Lien vers connexion */}
                <div className={style.login_link}>
                    <span className={style.login_text}>Déjà un compte ?</span>
                    <button
                        type="button"
                        onClick={handleLoginClick}
                        className={style.login_button}
                        aria-label="Se connecter"
                    >
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;