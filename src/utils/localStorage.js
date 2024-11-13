export function saveCartToLocalStorage(cart) {
  try {
    const localStorageCart = JSON.stringify(cart)
    localStorage.setItem("cart", localStorageCart)
  } catch (e) {
    console.error("Could not save cart", e)
  }
}

export function loadCartFromLocalStorage() {
  try {
    const localStorageCart = localStorage.getItem("cart")
    if (localStorageCart === null) return null // Trả về undefined nếu không có dữ liệu
    return JSON.parse(localStorageCart)
  } catch (e) {
    console.error("Could not load cart", e)
    return undefined
  }
}

export const loadViewedProductsFromLocalStorage = () => {
  try {
    const storedRecentItems = localStorage.getItem("recentItems")
    return storedRecentItems ? JSON.parse(storedRecentItems) : null
  } catch (error) {
    console.error("Error loading recent items from localStorage", error)
    return null
  }
}

export const saveViewedProductsToLocalStorage = (recentItems) => {
  try {
    localStorage.setItem("recentItems", JSON.stringify(recentItems))
  } catch (error) {
    console.error("Error saving recent items to localStorage", error)
  }
}
