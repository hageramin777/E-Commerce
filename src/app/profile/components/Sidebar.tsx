"use client"

import { Home, MapPin, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">My Account</h2>

      <nav className="space-y-2">
        <Link
          href="/profile"
          className="flex w-full items-center gap-3 rounded-lg bg-emerald-50 px-3 py-2 text-emerald-600"
        >
          <Home className="size-5" />
          Profile
        </Link>

        <Link
          href="/profile/addresses"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <MapPin className="size-5" />
          My Addresses
        </Link>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
          <Settings className="size-5" />
          Settings
        </button>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </nav>
    </aside>
  )
}
