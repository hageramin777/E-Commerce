import { Gift, Mail , Van, Phone } from "lucide-react"

export default function TopBar() {
  return (
    <div className="bg-white text-gray-700 text-sm px-6 py-2 flex items-center justify-between border-b">

      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2">
          <Van className="size-4 text-emerald-600" />
          Free Shipping on Orders $500
        </span>

        <span className="flex items-center gap-2">
          <Gift className="size-4 text-emerald-600" />
          New Arrivals Daily
        </span>
      </div>


      <div className="flex items-center gap-5">
        <span className="flex items-center gap-2">
          <Phone className="size-4 text-emerald-600" />
          +1 (800) 123-4567
        </span>
       <div className="flex items-center gap-5">
           <span className="flex items-center gap-2">
           <Mail className="size-4 text-emerald-600"/>
          support@freshcart.com
        </span>

        <a href="/login" className="hover:text-emerald-600">
          Sign In
        </a>

        <a href="/login/signup" className="hover:text-emerald-600">
          Sign Up
        </a>
      </div>
</div>
    </div>
  )
}