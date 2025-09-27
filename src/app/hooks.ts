// src/app/hooks.ts
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Hook typé pour dispatcher des actions.
 * Remplace useDispatch() et connaît le type exact de ton store.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Hook typé pour lire le state Redux.
 * Remplace useSelector() et infère automatiquement le type RootState.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
