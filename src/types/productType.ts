export interface CategoryType {
  _id: string
  name: string
  slug: string
  image: string
}


export interface BrandType {
  _id: string
  name: string
  slug: string
  image: string
}

export interface ProductType {
  _id: string
  title: string
  slug: string
  description?: string
  price: number
  priceAfterDiscount?: number
  imageCover: string
  ratingsAverage: number
  ratingsQuantity?: number
  category: CategoryType
  brand: BrandType
}
