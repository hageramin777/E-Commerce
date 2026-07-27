import {
  getCategoryById,
  getSubCategoriesForCategory,
} from "@/services/Categorys"
import { getAllProducts } from "@/services/Products"
import ProductCard from "@/app/components/productCard"
import Link from "next/link"
import { ArrowLeft, Layers } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CategoryProductsPage({ params }: PageProps) {
  const { id } = await params
  const category = await getCategoryById(id)
  
  const subCategories = await getSubCategoriesForCategory(id)
  const allProducts = await getAllProducts()

  const products = allProducts?.filter((p) => p.category?._id === id) ?? []

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-emerald-50 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/categories" className="hover:underline">Categories</Link>
            <span className="mx-1">/</span>
            <span>{category?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg size-11 flex items-center justify-center">
              <Layers className="size-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{category?.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/categories" className="text-emerald-600 text-sm flex items-center gap-1 hover:underline mb-6">
          <ArrowLeft className="size-4" /> Back to Categories
        </Link>

        {/* Subcategories pills */}
        {subCategories && subCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {subCategories.map((sub: { _id: string; name: string }) => (
              <span
                key={sub._id}
                className="border rounded-full px-4 py-1.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 cursor-pointer transition-colors"
              >
                {sub.name}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-500 mb-4">{products.length} products</p>

        {products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}