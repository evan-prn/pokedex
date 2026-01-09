/**
 * Bouton de filtre par
 * region.
 */

import type { IPokemon } from '../../types/IPokemon.ts';
import { useState } from "react";


/**
 * RegionFilterButtonProps
 *
 * filterPokemonList : Liste des pokémon a afficher en fonction de la région séléctionner.
 * isSelected : Boolean permettant de savoir si le bouton de filtre est activé ou non.
 */
interface RegionFilterButtonProps {
    filterPokemonList:  Array<IPokemon>;
    isSelected:         boolean;
}

const RegionFilterButton = () => {

}

export default RegionFilterButton;