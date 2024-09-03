import { useParams } from "react-router-dom"

function ProductDetail() {
  const { id } = useParams()
  return <div>Product Detail with params: {id}</div>
}

export default ProductDetail
