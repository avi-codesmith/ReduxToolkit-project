import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAddToCartState = { items: [], totalQuantity: 0 };

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: initialAddToCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => newItem.id === item.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => newItem.id === item.id);
      existingItem.totalPrice = existingItem.totalPrice - newItem.price;
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== newItem.id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

const initialToggleCartState = { visibleCart: false };

const toggleCartSlice = createSlice({
  name: "toggleCart",
  initialState: initialToggleCartState,
  reducers: {
    toggleCart(state) {
      state.visibleCart = !state.visibleCart;
    },
  },
});

const store = configureStore({
  reducer: {
    addToCart: addToCartSlice.reducer,
    toggleCart: toggleCartSlice.reducer,
  },
});

export const addToCartActions = addToCartSlice.actions;
export const toggleCartActions = toggleCartSlice.actions;
export default store;
