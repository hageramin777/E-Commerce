"use client"

import MYInput from "@/app/components/MYInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { changePasswordAction } from "./change-password.action"
import {
  changePasswordSchema,
  ChangePasswordValues,
} from "./change-password.schema"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  })

  async function submit(values: ChangePasswordValues) {
    setLoading(true)
    setMessage("")
    setIsSuccess(false)

    try {
      const result = await changePasswordAction(values)

      if (result.ok) {
        setMessage("Password changed successfully")
        setIsSuccess(true)
        reset()
        router.refresh()
      } else {
        setMessage(
          result.data?.message ??
            result.message ??
            "Something went wrong"
        )
      }
    } catch (error) {
      console.log(error)
      setMessage("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50">
          <KeyRound className="size-7 text-emerald-600" />
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold">
          Change Password
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Enter your current password and choose a new secure password.
        </p>

        <form onSubmit={handleSubmit(submit)} className="mt-6">
          <MYInput<ChangePasswordValues>
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Enter your current password"
            register={register}
            error={errors.currentPassword?.message}
            required
          />

          <MYInput<ChangePasswordValues>
            label="New Password"
            name="password"
            type="password"
            placeholder="Enter your new password"
            register={register}
            error={errors.password?.message}
            required
          />

          <MYInput<ChangePasswordValues>
            label="Confirm Password"
            name="rePassword"
            type="password"
            placeholder="Confirm your new password"
            register={register}
            error={errors.rePassword?.message}
            required
          />

          {message && (
            <p
              className={`my-3 text-center text-sm ${
                isSuccess ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </section>
    </main>
  )
}
