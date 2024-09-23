import { useQuery } from "@tanstack/react-query"
import { getHomeProducts } from "../services/apiProduct"

export function useHomeProducts() {
  const {
    // isLoading,
    data: products,
    // error,
  } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: getHomeProducts,
  })

  const { newMerch } = products?.data || {}

  return { newMerch }
}
