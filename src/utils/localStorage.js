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
    if (localStorageCart === null) return undefined // Trả về undefined nếu không có dữ liệu
    return JSON.parse(localStorageCart)
  } catch (e) {
    console.error("Could not load cart", e)
    return undefined
  }
}
