import { getProductById } from "@/services/Products"
import { getProductReviews } from "@/app/_actions/reviews.actions"
import ProductDetailsHero from "./_components/ProductDetailsHero"
import ProductTabs from "./_components/ProductTabs"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProductById(id)
  const reviewsRes = await getProductReviews(id)
  const reviews = reviewsRes?.data ?? []

  if (!product) {
    return <div className="text-center py-16">Product not found</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <ProductDetailsHero product={product} reviewsCount={reviews.length} />

      <div className="mt-10">
        <ProductTabs product={product} reviews={reviews} productId={id} />
      </div>
    </div>
  )
}