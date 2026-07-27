"use client"

import * as React from "react"
import { useContext, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Search } from "lucide-react"
import logo from "@/assets/images/logo.png"
import { CartContext } from "@/app/_context/CartContext"
import { getAllCategories } from "@/services/Categorys"
import { useSession } from "next-auth/react"
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
    <nav className="sticky top-0 z-50 bg-white flex items-center justify-between gap-4 px-6 py-3 border-b shadow-sm">
      {/* اللوجو */}
      <Link href="/" className="shrink-0">
        <Image src={logo} alt="FreshCart" width={120} height={32} />
      </Link>

      {/* السيرش */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          className="w-full py-3 border-2 rounded-2xl pl-9 pr-3 text-sm"
          placeholder="Search products..."
        />
      </div>

      {/* القوائم */}
      <NavigationMenu>
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

          {/* Categories dropdown - ديناميكي دلوقتي */}
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

          {!isLoggedIn && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/login">Sign In</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/login/signup">Sign up</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}

          {isLoggedIn && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/profile">My Account</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

        </NavigationMenuList>
      </NavigationMenu>
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
