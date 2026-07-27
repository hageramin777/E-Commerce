import { getAllCategories } from "@/services/Categorys"
import Link from "next/link"
import Image from "next/image"

export default async function ShopByCategory() {
  const categories = await getAllCategories()

  return (
    <div className="w-10/12 mx-auto p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-[30px] leading-[36px] font-bold font-exo">
  Shop By <span className="text-emerald-600">Category</span>
</h2>
        <Link href="/categories" className="text-green-600 text-sm hover:underline">
          view all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
        {categories?.map((item) => (
          <div key={item._id} className="border-2 shadow-2xl p-3 rounded-2xl text-center">
            <Image
              src={item.image}
              alt={item.name}
              width={150}
              height={150}
              className="w-full h-32 object-cover rounded-xl"
            />
            <p className="text-sm font-medium mt-2">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
