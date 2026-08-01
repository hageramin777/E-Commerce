"use client"

import * as React from "react"
import { useContext, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, LogOut, Search, ShoppingCart, UserRound } from "lucide-react"
import logo from "@/assets/images/logo.png"
import { CartContext } from "@/app/_context/CartContext"
import { getAllCategories } from "@/services/Categorys"
import { signOut, useSession } from "next-auth/react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface CategoryItem {
  _id: string
  name: string
}

export default function Navbar() {
  const { numberOfCartItems } = useContext(CartContext)
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const { data: session } = useSession()
  const isLoggedIn = !!session

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCategories()
      setCategories(data?.slice(0, 5) ?? [])
    }
    fetchCategories()
  }, [])

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center gap-3 border-b bg-white px-3 py-3 shadow-sm sm:px-6">
      {/* اللوجو */}
      <Link href="/" className="shrink-0">
        <Image src={logo} alt="FreshCart" width={120} height={32} />
      </Link>

      {/* السيرش */}
      <div className="relative order-3 w-full md:order-none md:flex-1 xl:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          className="w-full py-3 border-2 rounded-2xl pl-9 pr-3 text-sm"
          placeholder="Search products..."
        />
      </div>

      {/* القوائم */}
      <NavigationMenu className="hidden xl:flex">
        <NavigationMenuList>
          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Shop */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/Products">
                 Shop
                </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-56 p-2">
                <ListItem href="/categories" title="All Categories" />
                {categories.map((cat) => (
                  <ListItem key={cat._id} href={`/categories/${cat._id}`} title={cat.name} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Brands */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/brands">Brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Wishlist */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="size-4" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Cart - مع عداد المنتجات */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/cart" aria-label="Cart" className="relative">
                <ShoppingCart className="size-4" />
                {numberOfCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-medium rounded-full size-4 flex items-center justify-center">
                    {numberOfCartItems}
                  </span>
                )}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md border border-emerald-600 px-3 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              Sign In
            </Link>
            <Link
              href="/login/signup"
              className="inline-flex h-9 items-center justify-center rounded-md bg-emerald-600 px-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              <span className="hidden sm:inline">Create Account</span>
              <span className="sm:hidden">Sign Up</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/profile"
              className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              <UserRound className="size-4" />
              <span className="hidden sm:inline">My Account</span>
            </Link>
            <button
              type="button"
              onClick={() => signOut({ redirectTo: "/" })}
              className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

function ListItem({
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block rounded-md px-3 py-2 text-sm hover:bg-accent">
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
