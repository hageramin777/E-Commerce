import { CategoryType } from "@/types/productType"

export async function getAllCategories(): Promise<CategoryType[] | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
    const finalRes = await res.json()
    return finalRes.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getCategoryById(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    const finalRes = await res.json()
    return finalRes.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getSubCategoriesForCategory(categoryId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    )
    const finalRes = await res.json()
    return finalRes.data
  } catch (error) {
    console.log(error)
    return []
  }
}