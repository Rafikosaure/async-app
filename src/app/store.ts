import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// ——— Types inferés du store ———
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;