import { ProductType } from "@/types/productType"

export async function getAllProducts(): Promise<ProductType[] | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products?limit=100")
    const finalRes = await res.json()
    return finalRes.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getProductById(id: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const finalRes = await res.json()
    return finalRes.data
  } catch (error) {
    console.log(error)
    return null
  }
}
