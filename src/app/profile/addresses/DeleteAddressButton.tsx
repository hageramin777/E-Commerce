"use client"

import { deleteAddress } from "@/services/address.action"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import toast from "react-hot-toast"

interface Props {
  id: string
}

export default function DeleteAddressButton({ id }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    )

    if (!confirmed) return

    startTransition(async () => {
      const result = await deleteAddress(id)

      if (result.ok) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete address"
      className="size-10 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 className="mx-auto size-5" />
    </button>
  )
}
