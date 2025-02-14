import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  title: string;
  mainimage: string;
  price: number;
}

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Product>) {
      if (!state.items.some((item) => item._id === action.payload._id)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<Product>) {
      const existingIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingIndex !== -1) {
        // Favoride varsa kaldır
        state.items.splice(existingIndex, 1);
      } else {
        // Favoride yoksa ekle
        state.items.push(action.payload);
      }
    },
  },
});

export const { addFavorite, removeFavorite ,toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;