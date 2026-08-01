"use client"

import MYInput from "@/app/components/MYInput"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import toast from "react-hot-toast"
import { Truck, ShieldCheck, Clock, ShieldAlert, Users, Star, LogIn } from "lucide-react"
import cartImage from "@/assets/images/cart-illustration.png"
import { loginSchema, loginDataType } from "./login.schma"
import { loginAction } from "./login.action"
import { useSession } from "next-auth/react"


export default function LoginPage() {
  const router = useRouter()
  const { update: updateSession } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginDataType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  
  async function handleSignIn(values: loginDataType) {
    setIsLoading(true)

    try {
      const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl") ?? "/"
      const result = await loginAction(values, callbackUrl)

      if (!result.ok) {
        toast.error(result.message ?? "Invalid email or password", {
          position: "top-center",
        })
        return
      }

      await updateSession()
      toast.success("Signed in successfully", { position: "top-center" })
      router.replace(callbackUrl.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/")
      router.refresh()
    } catch (error) {
      console.error("[LoginPage] Sign in failed:", error)
      toast.error("Failed to connect to server", { position: "top-center" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center gap-10 max-w-6xl mx-auto px-6 py-10">
      {/* Left side - illustration */}
      <div className="hidden md:block text-center">
        <div className="bg-gray-50 rounded-2xl p-10">
          <Image
            src={cartImage}
            alt="FreshCart shopping cart"
            className="mx-auto"
            width={350}
            height={280}
          />
        </div>
        <h2 className="text-2xl font-bold mt-6">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="text-gray-500 mt-3">
          Join thousands of happy customers who trust FreshCart for their daily grocery needs
        </p>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Truck className="size-4 text-emerald-600" /> Free Delivery
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-4 text-emerald-600" /> Secure Payment
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-4 text-emerald-600" /> 24/7 Support
          </span>
        </div>
      </div>

      {/* Right side - form */}
      <div className="bg-white border rounded-2xl shadow-sm p-8">
        <h1 className="text-center text-2xl font-bold">
          <span className="text-emerald-600">Fresh</span>Cart
        </h1>
        <h2 className="text-center text-xl font-semibold mt-2">Welcome Back!</h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Sign in to continue your fresh shopping experience
        </p>

        <form className="mt-6" onSubmit={handleSubmit(handleSignIn)}>
          <MYInput<loginDataType>
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email?.message}
          />

          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
         <Link
  href="/login/forgot-password"
  className="text-emerald-600 hover:underline"
>
  Forgot Password?
</Link>
          </div>
          <MYInput<loginDataType>
            label=""
            type="password"
            name="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password?.message}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2"
          >
            <LogIn className="size-4" />
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          New to FreshCart?{" "}
          <Link href="/login/signup" className="text-emerald-600 font-medium hover:underline">
            Create an account
          </Link>
        </p>

        <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldAlert className="size-3" /> SSL Secured
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" /> 50K+ Users
          </span>
          <span className="flex items-center gap-1">
            <Star className="size-3" /> 4.9 Rating
          </span>
        </div>
      </div>
    </div>
  )
}
