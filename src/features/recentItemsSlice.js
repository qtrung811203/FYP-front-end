import { createSlice } from "@reduxjs/toolkit"

const recentItemsSlice = createSlice({
  name: "recentItems",
  initialState: {
    items: [],
  },
  reducers: {
    addRecentItem(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item._id === newItem._id)
      if (!existingItem) {
        state.items.unshift(newItem)
        if (state.items.length > 10) {
          state.items.pop()
        }
      }
    },
  },
})

export const { addRecentItem } = recentItemsSlice.actions
export default recentItemsSlice.reducer
