import {useDispatch}        from "react-redux";
import type {AppDispatch}   from "../store/store.ts";

/**
 * Hook useDispatch typé
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
