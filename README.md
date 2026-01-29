# 🎮 Poké-Tracker

Une application web moderne de gestion de Pokémon avec un style rétro inspiré du Pokédex original. Capturez, consultez et gérez votre collection de Pokémon avec une interface immersive fidèle à l'univers Pokémon.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Fonctionnalités

### 🎯 Principales
- **Pokédex Complet** : Consultez les 9 générations de Pokémon (1025 Pokémon)
- **Filtre par Génération** : Naviguez facilement entre Kanto, Johto, Hoenn et plus encore
- **Système de Capture** : Capturez et relâchez des Pokémon avec des animations immersives
- **Fiches Détaillées** : Statistiques, talents, résistances, évolutions et sprites shiny
- **Authentification** : Système de connexion/inscription pour sauvegarder votre collection
- **Design Pokédex Authentique** : Interface fidèle aux jeux Pokémon avec animations et effets 3D

### 📱 Fonctionnalités Avancées
- **Toggle Shiny** : Visualisez les versions chromatiques des Pokémon
- **Chaîne d'évolution interactive** : Explorez les évolutions avec navigation intégrée
- **Système de types** : Badges colorés pour chaque type de Pokémon
- **Barres de statistiques** : Visualisation graphique des stats (HP, Attaque, Défense, etc.)
- **Responsive Design** : Interface optimisée pour desktop, tablette et mobile
- **Cache intelligent** : Données mises en cache avec RTK Query pour des performances optimales

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **React Router v6** - Routing client-side

### State Management
- **Redux Toolkit** - Gestion d'état globale
- **RTK Query** - Fetching et cache de données API
- **Redux Persist** - Persistance locale des données

### Styling
- **CSS Modules** - Styles scopés par composant
- **Animations CSS** - Effets 3D, transitions et keyframes
- **Design System Pokémon** - Palette de couleurs authentique

### API
- **Tyradex API** - Base de données Pokémon complète
    - Endpoint : `https://tyradex.vercel.app/api/v1/`
    - Documentation : [Tyradex](https://tyradex.vercel.app/)

## 📦 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### Étapes d'installation
```bash
# Cloner le repository
git clone https://github.com/evan-prn/pokedex.git
cd pokedex

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
# http://localhost:5173
```

### Scripts disponibles
```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Compile pour la production
npm run preview      # Prévisualise le build de production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
npm run type-check   # Vérifie les types TypeScript
```

## 📁 Structure du Projet
```
src/
├── api/                        # Configuration RTK Query
│   └── pokemonAPI.ts          # Endpoints API
├── components/                 # Composants React
│   ├── Auth/                  # Authentification
│   │   ├── LoginForm/
│   │   └── RegisterForm/
│   ├── Buttons/               # Boutons réutilisables
│   │   ├── AuthButton/
│   │   └── CatchButton/       # Bouton capture/relâcher
│   ├── CurrentTrainer/        # Carte du dresseur actuel
│   ├── GenerationCarousel/    # Sélecteur de génération
│   ├── Loading/               # Composant de chargement
│   ├── Navbar/                # Barre de navigation
│   ├── PokemonCard/           # Carte Pokémon (liste)
│   ├── PokemonDetailedView/   # Vue détaillée d'un Pokémon
│   └── BasicPokemonList/      # Liste principale
├── data/                       # Données statiques
│   └── generation.ts          # Infos sur les 9 générations
├── store/                      # Redux Store
│   ├── slices/                # Redux Slices
│   │   ├── pokemon-slice.ts   # Gestion des captures
│   │   ├── generation-slice.ts # Filtre génération
│   │   └── trainer-slice.ts   # Authentification
│   ├── selectors/             # Redux Selectors
│   └── store.ts               # Configuration du store
├── types/                      # Types TypeScript
│   ├── IPokemon.ts
│   ├── ITrainer.ts
│   └── IGeneration.ts
├── App.tsx                     # Composant racine
└── main.tsx                    # Point d'entrée
```

## 🎨 Design System

### Palette de Couleurs
```css
/* Pokédex Rouge */
--pokedex-red: #e63946
--pokedex-red-dark: #cc1e31

/* Pokédex Bleu */
--pokedex-blue: #667eea
--pokedex-blue-dark: #4a5fd9

/* Doré (Badges, Boutons) */
--gold: #ffd700
--gold-dark: #cc9900

/* Fond Nuit */
--bg-dark: #0a285f
--bg-dark-alt: #2a4a7e

/* États */
--success: #4ecdc4
--warning: #ff6b6b
--neutral: #f0f0f0
--immunity: #e5e7eb
```

### Typographie

- **Titres** : Arial, sans-serif (bold, uppercase)
- **Badges/Stats** : Courier New, monospace
- **Corps de texte** : Arial, sans-serif

### Effets Signature

- **Glassmorphism** : `backdrop-filter: blur(10px)`
- **Ombres 3D** : Multiples box-shadows pour profondeur
- **Bordures Pokédex** : `border: 4px solid #1a1a1a`
- **LED clignotantes** : Animations `@keyframes ledBlink`
- **Effet holographique** : Brillance traversante sur hover

## 🔑 Fonctionnalités Clés

### Système de Capture
```typescript
// Capturer un Pokémon
dispatch(catchPokemon({
  trainerName: 'Sacha',
  pokemon: {
    pokedexId: 25,
    name: 'Pikachu',
    image: '...',
    types: ['Électrik']
  }
}));

// Relâcher un Pokémon
dispatch(releasePokemon({
  trainerName: 'Sacha',
  pokedexId: 25
}));
```

### Filtrage par Génération
```typescript
// Changer de génération
dispatch(setGeneration(3)); // Hoenn

// L'API est automatiquement appelée
// Endpoint : /api/v1/gen/3
```

### Navigation dans les Évolutions

- Clic sur n'importe quel Pokémon de la chaîne
- Navigation automatique vers la fiche détaillée
- Highlight du Pokémon actuellement consulté
- Affichage des conditions d'évolution

## 🚀 Performance

- **RTK Query Cache** : Évite les appels API redondants
- **Code Splitting** : Chargement lazy des routes
- **Images Lazy Loading** : `loading="lazy"` sur les sprites
- **CSS Modules** : Styles scopés et optimisés
- **Memoization** : Selectors Redux avec `createSelector`

## 📱 Responsive Breakpoints
```css
/* Desktop */
@media (min-width: 993px) { /* Expérience optimale */ }

/* Tablettes */
@media (max-width: 992px) { /* Layout adapté */ }
@media (max-width: 768px) { /* Compact */ }

/* Mobile */
@media (max-width: 480px) { /* Une colonne */ }
```

## ♿ Accessibilité

- **Aria Labels** : Tous les boutons et liens interactifs
- **Navigation Clavier** : Tab, Enter, Space supportés
- **Focus Visible** : Outlines dorées sur focus
- **Reduced Motion** : `prefers-reduced-motion` supporté
- **Contraste** : WCAG AA compliant
- **Screen Readers** : Textes alternatifs sur images

## 🔐 Gestion d'État

### Redux Store Structure
```typescript
{
  pokemon: {
    trainers: {
      'Sacha': {
        trainerName: 'Sacha',
        trainerPassword: '***',
        caughtPokemon: [
          { pokedexId: 25, name: 'Pikachu', ... }
        ]
      }
    }
  },
  generation: {
    currentGen: 1
  },
  trainer: {
    currentTrainer: { ... } | null
  },
  pokemonAPI: {
    queries: { ... },
    mutations: { ... }
  }
}
```

## 🎯 Roadmap

### Version Future (v2.0)

- [ ] **Recherche avancée** : Par nom, type, talent
- [ ] **Comparateur** : Comparer 2-3 Pokémon côte à côte
- [ ] **Équipes** : Créer et gérer des équipes de 6 Pokémon
- [ ] **Import/Export** : Sauvegarder sa collection en JSON
- [ ] **Mode Sombre** : Thème alternatif
- [ ] **PWA** : Installation en tant qu'app
- [ ] **Statistiques** : Dashboard du dresseur
- [ ] **Badges** : Système de succès/achievements
- [ ] **Trading** : Échanger entre dresseurs (multi-user)
- [ ] **Favoris** : Marquer des Pokémon préférés

## 🐛 Bugs Connus

- Aucun bug critique identifié pour le moment

## 📝 Changelog

### v1.0.0 (Janvier 2026)
- ✨ Version initiale
- 🎨 Design Pokédex complet
- 🔴 Système de capture
- 📊 Fiches détaillées avec stats
- 🔄 Chaînes d'évolution
- ✨ Toggle shiny
- 🌍 9 générations disponibles

## 👤 Auteur

**Evan** - Étudiant CDAN (Concepteur Développeur d'Applications Numériques)
- Ynov Campus
- Apprenti développeur chez Avilon

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Tyradex API** - Pour la base de données Pokémon complète
- **The Pokémon Company** - Pour l'univers Pokémon
- **Redux Team** - Pour Redux Toolkit et RTK Query
- **Vite Team** - Pour l'excellent outil de build

## 📞 Contact & Support

Pour toute question, suggestion ou bug report :
- 📧 Email : [votre-email@exemple.com]
- 🐛 Issues : [GitHub Issues](https://github.com/votre-username/poke-tracker/issues)

---

<p align="center">
  Made with ❤️ and ⚡ by Evan
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" width="96">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="Charizard" width="96">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="Venusaur" width="96">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" alt="Blastoise" width="96">
</p>

<p align="center">
  <strong>Attrapez-les tous ! 🎮</strong>
</p>