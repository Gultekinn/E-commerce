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
  totalAmount: number; // Sepetteki toplam tutarı ekledik
}

const initialState: CartState = {
  items: [],
  totalAmount: 0, // Başlangıçta toplam tutar sıfır
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingProduct = state.items.find((item) => item._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Varsayılan 1 ekle
      } else {
        state.items.push({ ...product, quantity: 1 }); // Yeni ürün olarak ekle ve quantity'yi varsayılan 1 yap
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    
    
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0); // Toplam tutarı güncelle
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const product = state.items.find((item) => item._id === action.payload);
      if (product) {
        product.quantity += 1;
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0); // Toplam tutarı güncelle
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const product = state.items.find((item) => item._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item._id !== action.payload);
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0); // Toplam tutarı güncelle
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
