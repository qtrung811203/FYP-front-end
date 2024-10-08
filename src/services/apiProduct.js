import axiosInstance from "../config/axiosConfig"

export async function getHomeProducts() {
  try {
    const response = await axiosInstance.get("/products/home")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function getProductBySlug(slug) {
  try {
    const response = await axiosInstance.get(`/products/${slug}`)
    const productData = response.data.data[0]

    productData.items.forEach((itemCategory) => {
      itemCategory.items.forEach((item) => {
        item.slug = productData.productInfo.slug
        item.productName = productData.productInfo.name
      })
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
