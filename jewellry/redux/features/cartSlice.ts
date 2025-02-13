import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  title: string;
  mainimage: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingProduct = state.items.find((item) => item._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Eğer ürün varsa, miktarı artır
      } else {
        state.items.push({ ...product, quantity: 1 }); // Yoksa ekle ve quantity=1 yap
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const product = state.items.find((item) => item._id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const product = state.items.find((item) => item._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item._id !== action.payload);
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
