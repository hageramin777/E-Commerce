"use client"

import MYInput from "@/app/components/MYInput"
import { addAddress } from "@/services/address.action"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, MapPin, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import {
  addressSchema,
  AddressFormValues,
} from "./address.schema"

export default function AddAddressPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      city: "",
      phone: "",
      details: "",
    },
  })

  async function submit(values: AddressFormValues) {
    setIsLoading(true)

    try {
      const result = await addAddress(values)

      if (result.ok) {
        toast.success(result.message)
        router.push("/profile/addresses")
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Unable to add address")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <section className="mx-auto max-w-xl rounded-2xl border bg-white p-8 shadow-sm">
        <Link
          href="/profile/addresses"
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600"
        >
          <ArrowLeft className="size-4" />
          Back to addresses
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <MapPin className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add Address</h1>
            <p className="text-sm text-gray-500">
              Add a new delivery address to your account.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <MYInput<AddressFormValues>
            label="Address Name"
            name="name"
            placeholder="Home or Work"
            register={register}
            error={errors.name?.message}
            required
          />

          <MYInput<AddressFormValues>
            label="City"
            name="city"
            placeholder="Enter your city"
            register={register}
            error={errors.city?.message}
            required
          />

          <MYInput<AddressFormValues>
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            register={register}
            error={errors.phone?.message}
            required
          />

          <div className="mb-4">
            <label
              htmlFor="details"
              className="mb-1 block text-sm font-medium"
            >
              Address Details
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="details"
              rows={4}
              placeholder="Street, building and apartment"
              {...register("details")}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.details
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-emerald-200"
              }`}
            />
            {errors.details && (
              <p className="mt-1 text-xs text-red-500">
                {errors.details.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            <Plus className="size-5" />
            {isLoading ? "Adding..." : "Add Address"}
          </button>
        </form>
      </section>
    </main>
  )
}
