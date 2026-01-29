import {useSelector}        from "react-redux";
import type {RootState}     from "../store/store.ts";

/**
 * Hook useSelector typé
 */
export const useAppSelector = useSelector.withTypes<RootState>();