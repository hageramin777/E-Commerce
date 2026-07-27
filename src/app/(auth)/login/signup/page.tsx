"use client"

import MYInput from "@/app/components/MYInput"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Star, Truck, ShieldCheck, UserPlus } from "lucide-react"
import { signupSchema, SignUpFormValues } from "./signup.schma"
import { signupAction } from "./signup.action"

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  })

  const passwordValue = watch("password")

  function getPasswordStrength(pass: string) {
    if (!pass) return { label: "", width: "0%", color: "" }
    if (pass.length < 6)
      return { label: "Weak", width: "33%", color: "bg-red-500" }
    if (pass.length < 10)
      return { label: "Medium", width: "66%", color: "bg-yellow-500" }

    return { label: "Strong", width: "100%", color: "bg-emerald-500" }
  }

  const strength = getPasswordStrength(passwordValue)


  async function handleSignUp(values: SignUpFormValues) {
    setIsLoading(true)
    setApiError(null)

    try {
      const { terms, ...signupData } = values

      const res = await signupAction(signupData)

      if (res.ok) {
        router.push("/login")
      } else {
        setApiError(res.data.message || "Something went wrong")
      }

    } catch (error) {
      console.log(error)
      setApiError("Failed to connect to server")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6 py-10">

      {/* Left side */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-emerald-600">FreshCart</span>
        </h1>

        <p className="text-gray-500 mt-2">
          Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
        </p>


        <div className="space-y-5 mt-6">

          <div className="flex gap-3">
            <div className="bg-emerald-100 text-emerald-600 rounded-full size-9 flex items-center justify-center shrink-0">
              <Star className="size-4" />
            </div>

            <div>
              <h3 className="font-semibold text-sm">
                Premium Quality
              </h3>
              <p className="text-gray-500 text-sm">
                Premium quality products sourced from trusted suppliers.
              </p>
            </div>
          </div>


          <div className="flex gap-3">
            <div className="bg-emerald-100 text-emerald-600 rounded-full size-9 flex items-center justify-center shrink-0">
              <Truck className="size-4" />
            </div>

            <div>
              <h3 className="font-semibold text-sm">
                Fast Delivery
              </h3>
              <p className="text-gray-500 text-sm">
                Same-day delivery available in most areas
              </p>
            </div>
          </div>


          <div className="flex gap-3">
            <div className="bg-emerald-100 text-emerald-600 rounded-full size-9 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-4" />
            </div>

            <div>
              <h3 className="font-semibold text-sm">
                Secure Shopping
              </h3>

              <p className="text-gray-500 text-sm">
                Your data and payments are completely secure
              </p>
            </div>
          </div>

        </div>


        <div className="border rounded-xl p-4 mt-8">
          <div className="flex items-center gap-2">

            <div className="size-9 rounded-full bg-orange-200" />

            <div>
              <p className="text-sm font-semibold">
                Sarah Johnson
              </p>

              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3 fill-yellow-400"
                  />
                ))}
              </div>
            </div>

          </div>

          <p className="text-sm text-gray-600 italic mt-3">
            &quot;FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!&quot;
          </p>

        </div>

      </div>


      {/* Form */}
      <div>

        <h2 className="text-2xl font-bold text-center">
          Create Your Account
        </h2>

        <p className="text-gray-500 text-sm text-center mt-1">
          Start your fresh journey with us today
        </p>


        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="mt-6"
        >

          <MYInput<SignUpFormValues>
            label="Name"
            name="name"
            placeholder="Ali"
            register={register}
            error={errors.name?.message}
            required
          />


          <MYInput<SignUpFormValues>
            label="Email"
            type="email"
            name="email"
            placeholder="ali@example.com"
            register={register}
            error={errors.email?.message}
            required
          />


          <MYInput<SignUpFormValues>
            label="Password"
            type="password"
            name="password"
            placeholder="create a strong password"
            register={register}
            error={errors.password?.message}
            required
          />


          {passwordValue && (
            <div className="flex items-center gap-2 -mt-3 mb-4">

              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className={`h-full ${strength.color} transition-all`}
                  style={{
                    width: strength.width
                  }}
                />

              </div>

              <span className="text-xs text-gray-500">
                {strength.label}
              </span>

            </div>
          )}



          <MYInput<SignUpFormValues>
            label="Confirm Password"
            type="password"
            name="rePassword"
            placeholder="confirm your password"
            register={register}
            error={errors.rePassword?.message}
            required
          />



          <MYInput<SignUpFormValues>
            label="Phone Number"
            name="phone"
            placeholder="+1 234 567 8900"
            register={register}
            error={errors.phone?.message}
            required
          />



          <div className="mb-4">

            <label className="flex items-start gap-2 text-sm text-gray-600">

              <input
                type="checkbox"
                className="mt-0.5 rounded"
                {...register("terms")}
              />


              <span>
                I agree to the{" "}
                <span className="text-emerald-600">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-emerald-600">
                  Privacy Policy
                </span>

                <span className="text-red-500">
                  *
                </span>

              </span>

            </label>


            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">
                {errors.terms.message}
              </p>
            )}

          </div>



          {apiError && (
            <p className="text-red-500 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {apiError}
            </p>
          )}



          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2"
          >

            <UserPlus className="size-4"/>

            {
              isLoading
              ? "Creating account..."
              : "Create My Account"
            }

          </button>


        </form>

      </div>

    </div>
  )
}