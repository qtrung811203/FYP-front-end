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
          quantity: 1, // add quantity field
          totalPrice: newItem.price, // add totalPrice field
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      }
    },
    decreaseQuantity(state, action) {
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
    increaseQuantity(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item._id === id)
      state.totalQuantity++
      state.totalPrice += existingItem.price
      existingItem.quantity++
      existingItem.totalPrice += existingItem.price
    },
    removeFromCart(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item._id === id)
      state.totalQuantity -= existingItem.quantity
      state.totalPrice -= existingItem.totalPrice
      state.items = state.items.filter((item) => item._id !== id)
    },
    removeAllFromCart(state) {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
  },
})

export const { addToCart, decreaseQuantity, increaseQuantity, removeFromCart, removeAllFromCart } =
  cartSlice.actions
export default cartSlice.reducer
