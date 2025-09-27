import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'https://star-wars-artefacts-api.vercel.app/api/products?limit=all';

// Typage d’un produit tel que renvoyé par l'API
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    currencyCode: string;
    maxQuantity: number;
    imageUrl: string;
    largeImageUrl: string;
    isActive: boolean;
    tags: string[];
    materials: string[];
}

// Typage de la pagination
interface Pagination {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Typage de la réponse de l’API
interface ProductsResponse {
    data: Product[];
    pagination: Pagination;
}

// État initial du slice
interface ProductsState {
    items: Product[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    pagination: null,
    loading: false,
    error: null,
};

// Thunk : il encapsule la logique asynchrone de fetch
export const fetchProducts = createAsyncThunk<
    ProductsResponse,        // type du retour si succès
    { page?: number; pageSize?: number }, // paramètres acceptés
    { rejectValue: string }  // type du message d’erreur
>(
    'products/fetchAll',
    async ({ page = 1, pageSize = 6 }, { rejectWithValue }) => {
        try {
            const url = new URL(API_URL);
            url.searchParams.set('page', page.toString());
            url.searchParams.set('pageSize', pageSize.toString());
            const res = await fetch(url.toString());
            if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
            return (await res.json()) as ProductsResponse;
        } catch (e) {
            return rejectWithValue('Erreur réseau');
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
                state.loading = false;
                state.items = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Erreur inconnue';
            });
    },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;