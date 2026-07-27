import { ArrowRight, Flame, Sparkles } from "lucide-react"
import Link from "next/link"

export default function PromotionBanners() {
  return (
    <section className="mx-auto grid w-10/12 gap-8 px-5 py-8 lg:grid-cols-2">
      <article className="relative min-h-[310px] overflow-hidden rounded-[20px] bg-gradient-to-r from-emerald-500 to-emerald-700 p-8 text-white md:p-11">
        <span className="absolute -right-20 -top-24 size-52 rounded-full bg-white/10" />
        <span className="absolute -bottom-20 -left-20 size-40 rounded-full bg-white/10" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            <Flame className="size-5 fill-amber-400 text-orange-600" />
            Deal of the Day
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            Fresh Organic Fruits
          </h2>

          <p className="mt-3 text-base text-emerald-50 md:text-lg">
            Get up to 40% off on selected organic fruits
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <strong className="text-3xl font-bold md:text-4xl">
              40% OFF
            </strong>
            <span className="text-sm text-emerald-50 md:text-base">
              Use code: <b className="text-white">ORGANIC40</b>
            </span>
          </div>

          <Link
            href="/Products"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 font-semibold text-emerald-600 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Shop Now
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </article>

      <article className="relative min-h-[310px] overflow-hidden rounded-[20px] bg-gradient-to-r from-orange-500 to-rose-500 p-8 text-white md:p-11">
        <span className="absolute -right-20 -top-24 size-52 rounded-full bg-white/10" />
        <span className="absolute -bottom-20 -left-20 size-40 rounded-full bg-white/10" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            <Sparkles className="size-5 fill-yellow-300 text-amber-500" />
            New Arrivals
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            Exotic Vegetables
          </h2>

          <p className="mt-3 text-base text-orange-50 md:text-lg">
            Discover our latest collection of premium vegetables
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <strong className="text-3xl font-bold md:text-4xl">
              25% OFF
            </strong>
            <span className="text-sm text-orange-50 md:text-base">
              Use code: <b className="text-white">FRESH25</b>
            </span>
          </div>

          <Link
            href="/Products"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 font-semibold text-orange-600 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore Now
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </article>
    </section>
  )
}
