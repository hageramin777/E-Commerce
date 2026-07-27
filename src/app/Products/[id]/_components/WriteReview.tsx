"use client"

import { useState, useTransition } from "react"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { createReview } from "@/app/_actions/reviews.actions"

export default function WriteReview({ productId }: { productId: string }) {
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSubmit() {
    if (rating === 0 || !title.trim()) {
      toast.error("Please add a rating and a comment")
      return
    }

    startTransition(async () => {
      const res = await createReview(productId, title, rating)
      if (res.ok) {
        toast.success("Review submitted!")
        setShowForm(false)
        setTitle("")
        setRating(0)
        router.refresh()
      } else {
        toast.error(res.message || res.data?.message || "You must be logged in")
      }
    })
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="text-emerald-600 text-sm font-medium hover:underline block mx-auto"
      >
        Write a Review
      </button>
    )
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <button key={i} onClick={() => setRating(i + 1)}>
            <Star
              className={`size-6 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        ))}
      </div>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Share your experience with this product..."
        className="w-full border rounded-lg px-3 py-2 text-sm resize-none h-20 mb-3"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-sm px-4 py-2 rounded-lg"
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 text-sm px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}