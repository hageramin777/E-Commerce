import { lazy, Suspense } from "react"
import ProductCard from "@/app/components/productCard"
import { getAllProducts } from "@/services/Products"
import MySlider from "@/app/components/MySlider"
import homeSlider from "@/assets/images/home-slider.png"
import PromotionBanners from "@/app/components/PromotionBanners"

const ShopByCategoryAsLazyComp = lazy(() => import("./components/ShopByCategory"))

export default async function Home() {
  const products = await getAllProducts()

  const slides = [
    {
      image: homeSlider,
      title: "Premium Quality Guaranteed",
      subtitle: "Fresh from farm to your table",
    },
    {
      image: homeSlider,
      title: "Fresh Vegetables Daily",
      subtitle: "Straight from the farm to you",
    },
    {
      image: homeSlider,
      title: "Best Prices Every Day",
      subtitle: "Quality you can trust",
    },
  ]

  return (
    <>
      <MySlider listOfImages={slides} />

      <Suspense fallback={<div className="p-5 text-center text-gray-400">Loading categories...</div>}>
        <ShopByCategoryAsLazyComp />
      </Suspense>

      <PromotionBanners />

      <h2 className="p-4 pl-3 text-[30px] font-bold leading-[36px] font-exo border-l-4 border-green-600">
        Featured <span className="text-green-600">Products</span>
      </h2>

      <div className="container w-10/12 mx-auto bg-slate-50 p-5 grid gap-5 md:grid-cols-4 xl:grid-cols-5">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}
