"use client"

import MYInput from "@/app/components/MYInput"
import {
  changePasswordSchema,
  ChangePasswordValues,
} from "@/app/change-password/change-password.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { changePassword } from "../profile.action"

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

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
    setSuccess(false)

    const result = await changePassword(values)

    if (result.ok) {
      setSuccess(true)
      setMessage("Password changed successfully")
      reset()
    } else {
      setMessage(result.data?.message || "Something went wrong")
    }

    setLoading(false)
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <KeyRound className="text-emerald-600" />
        <h2 className="text-xl font-semibold">
          Change Password
        </h2>
      </div>

      <form onSubmit={handleSubmit(submit)}>

        <MYInput<ChangePasswordValues>
          label="Current Password"
          name="currentPassword"
          type="password"
          register={register}
          error={errors.currentPassword?.message}
          required
        />

        <MYInput<ChangePasswordValues>
          label="New Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
          required
        />

        <MYInput<ChangePasswordValues>
          label="Confirm Password"
          name="rePassword"
          type="password"
          register={register}
          error={errors.rePassword?.message}
          required
        />

        {message && (
          <p
            className={`mb-4 text-sm ${
              success ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

      </form>
    </section>
  )
}