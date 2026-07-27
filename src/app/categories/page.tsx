import { getAllCategories } from "@/services/Categorys"
import Link from "next/link"
import Image from "next/image"
import { Layers, ChevronRight } from "lucide-react"

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div>
      {/* Green header banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-emerald-50 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <span>Categories</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg size-11 flex items-center justify-center">
              <Layers className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">All Categories</h1>
              <p className="text-emerald-50 text-sm">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {categories?.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-sm font-medium">{cat.name}</p>
                <span className="text-emerald-600 text-xs flex items-center justify-center gap-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Subcategories <ChevronRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}