export interface WishlistProductType {
  _id: string
  title: string
  price: number
  imageCover: string
  ratingsAverage: number
  category?: {
    name: string
  }
}

export interface WishlistResponseType {
  status: string
  count: number
  data: WishlistProductType[]
}