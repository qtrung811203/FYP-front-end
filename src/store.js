import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cartSlice"
import recentItemsReducer from "./features/recentItemsSlice"

import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
  loadViewedProductsFromLocalStorage,
  saveViewedProductsToLocalStorage,
} from "./utils/localStorage"

const preloadedState = {
  cart: loadCartFromLocalStorage() || { items: [], totalQuantity: 0, totalPrice: 0 },
  recentItems: loadViewedProductsFromLocalStorage() || { items: [] },
}

const store = configureStore({
  preloadedState,
  reducer: {
    cart: cartReducer,
    recentItems: recentItemsReducer,
  },
})

store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart)
  saveViewedProductsToLocalStorage(store.getState().recentItems)
})

export default store
