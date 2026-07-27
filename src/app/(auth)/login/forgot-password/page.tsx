"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  forgotPasswordAction,
  verifyResetCodeAction,
  resetPasswordAction
} from "./forgot-password.action"



export default function ForgotPasswordPage(){

  const router = useRouter()

  const [step,setStep] = useState(1)

  const [email,setEmail] = useState("")
  const [code,setCode] = useState("")
  const [password,setPassword] = useState("")

  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)



  async function sendEmail(){

    setLoading(true)

    const res = await forgotPasswordAction(email)

    setLoading(false)


    if(res.ok){

      setStep(2)

    }else{

      setError(res.data.message || "Email error")

    }

  }




  async function verifyCode(){

    setLoading(true)

    const res = await verifyResetCodeAction(code)

    setLoading(false)


    if(res.ok){

      setStep(3)

    }else{

      setError("Invalid reset code")

    }

  }




  async function changePassword(){

    setLoading(true)

    const res = await resetPasswordAction(
      email,
      password
    )

    setLoading(false)


    if(res.ok){

      router.push("/login")

    }else{

      setError(res.data.message || "Reset failed")

    }

  }





  return (

    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md border rounded-xl p-6">


        <h1 className="text-2xl font-bold text-center">
          Forgot Password
        </h1>



        {
          step === 1 && (

            <>
              <input
                className="border rounded-lg w-full p-2 mt-6"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />


              <button
                onClick={sendEmail}
                className="bg-emerald-600 text-white w-full mt-4 py-2 rounded-lg"
              >
                {loading ? "Sending..." : "Send Code"}
              </button>

            </>

          )
        }




        {
          step === 2 && (

            <>

              <input
                className="border rounded-lg w-full p-2 mt-6"
                placeholder="Reset Code"
                value={code}
                onChange={(e)=>setCode(e.target.value)}
              />


              <button
                onClick={verifyCode}
                className="bg-emerald-600 text-white w-full mt-4 py-2 rounded-lg"
              >
                Verify Code
              </button>

            </>

          )
        }





        {
          step === 3 && (

            <>

              <input
                type="password"
                className="border rounded-lg w-full p-2 mt-6"
                placeholder="New Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />


              <button
                onClick={changePassword}
                className="bg-emerald-600 text-white w-full mt-4 py-2 rounded-lg"
              >
                Reset Password
              </button>


            </>

          )
        }



        {
          error && (
            <p className="text-red-500 text-sm mt-4">
              {error}
            </p>
          )
        }



      </div>

    </div>

  )
}