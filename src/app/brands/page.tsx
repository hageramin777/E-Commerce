import { getAllBrands } from "@/services/Brands"
import Link from "next/link"
import Image from "next/image"
import { Tag } from "lucide-react"

export default async function BrandsPage() {
  const brands = await getAllBrands()

  return (
    <div>
      {/* Green header banner - نفس أسلوب Categories */}
      <div className="bg-[#873EFF] px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-emerald-50 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <span>Brands</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg size-11 flex items-center justify-center">
              <Tag className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">All Brands</h1>
              <p className="text-emerald-50 text-sm">Shop by your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {brands?.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="aspect-square bg-white flex items-center justify-center p-6">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 text-center border-t">
                <p className="text-sm font-medium">{brand.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
