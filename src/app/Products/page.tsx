import Link from "next/link"
import { getAllProducts } from "@/services/Products"

export default async function ProductsPage() {

  const products = await getAllProducts()

  return (
    <main className="px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">
        All Products
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {products?.map((product) => (

          <Link
            key={product._id}
              href={`/Products/${product._id}`}
            className="border rounded-xl p-4"
          >


            <img
              src={product.imageCover}
              alt={product.title}
              className="h-48 w-full object-cover rounded-lg"
            />

            <h2 className="mt-3 font-semibold">
              {product.title}
            </h2>

            <p className="text-emerald-600">
              {product.price} EGP
            </p>

          </Link>

        ))}

      </div>

    </main>
  )
}