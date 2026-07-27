import { BrandType } from "@/types/productType"

export async function getAllBrands(): Promise<BrandType[] | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands?limit=100")
    const finalRes = await res.json()
    return finalRes.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getBrandById(id: string): Promise<BrandType | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    const finalRes = await res.json()
    return finalRes.data
  } catch (error) {
    console.log(error)
    return null
  }
}