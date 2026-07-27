export interface ReviewType {
  _id: string
  review: string
  rating: number
  user: {
    _id: string
    name: string
  }
  product: string
  createdAt: string
}

export interface ReviewsResponseType {
  results: number
  data: ReviewType[]
}