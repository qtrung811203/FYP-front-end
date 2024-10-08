import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cartSlice"

import { loadCartFromLocalStorage, saveCartToLocalStorage } from "./utils/localStorage"

const preloadedState = {
  cart: loadCartFromLocalStorage() || { items: [], totalQuantity: 0, totalPrice: 0 },
}

const store = configureStore({
  preloadedState,
  reducer: {
    cart: cartReducer,
  },
})

store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart)
})

export default store
