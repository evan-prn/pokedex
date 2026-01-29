/**
 * hooks.ts
 * Hooks Redux typés pour TypeScript
 */

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Hook useDispatch typé
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Hook useSelector typé
 */
export const useAppSelector = useSelector.withTypes<RootState>();