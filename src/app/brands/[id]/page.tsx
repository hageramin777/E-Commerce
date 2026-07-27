import { getBrandById } from "@/services/Brands"
import { getAllProducts } from "@/services/Products"
import ProductCard from "@/app/components/productCard"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BrandProductsPage({ params }: PageProps) {
  const { id } = await params
  const brand = await getBrandById(id)
  const allProducts = await getAllProducts()

  const products = allProducts?.filter((p) => p.brand?._id === id) ?? []

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-emerald-50 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/brands" className="hover:underline">Brands</Link>
            <span className="mx-1">/</span>
            <span>{brand?.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-lg size-16 flex items-center justify-center p-2">
              <Image
                src={brand?.image ?? ""}
                alt={brand?.name ?? ""}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">{brand?.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/brands" className="text-emerald-600 text-sm flex items-center gap-1 hover:underline mb-6">
          <ArrowLeft className="size-4" /> Back to Brands
        </Link>

        <p className="text-gray-500 mb-4">{products.length} products</p>

        {products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No products found for this brand.
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