import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item._id === newItem._id)
      state.totalQuantity++
      state.totalPrice += newItem.price
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      }
    },
    removeFromCart(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item._id === id)
      state.totalQuantity--
      state.totalPrice -= existingItem.price
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
