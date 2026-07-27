"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image, { StaticImageData } from "next/image"


interface SlideContent {
  image: StaticImageData
  title: string
  subtitle: string
}

interface MySliderPropsType {
  listOfImages: SlideContent[]
  spaceBetween?: number
  slidesPerView?: number
}

export default function MySlider({
  listOfImages,
  spaceBetween = 0,
  slidesPerView = 1,
}: MySliderPropsType) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation
      pagination={{ clickable: true }}
      className="w-full"
    >
      {listOfImages.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[400px] w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-emerald-600/60" />
            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 max-w-md">
                {slide.title}
              </h1>
              <p className="text-lg mb-6">{slide.subtitle}</p>
              <div className="flex gap-3">
                <button className="bg-white text-emerald-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100">
                  Shop Now
                </button>
                <button className="border border-white text-white font-semibold px-6 py-2 rounded-lg hover:bg-white/10">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}