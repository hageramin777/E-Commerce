"use client"

import { createContext, useState, type ReactNode } from "react"

type CartContextType = {
  numberOfCartItems: number
  setNumberOfCartItems: (value: number) => void
}

export const CartContext = createContext<CartContextType>({
  numberOfCartItems: 0,
  setNumberOfCartItems: () => {},
})

export function CartProvider({
  children,
  initialNumberOfCartItems = 0,
}: {
  children: ReactNode
  initialNumberOfCartItems?: number
}) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(
    initialNumberOfCartItems
  )

  return (
    <CartContext.Provider value={{ numberOfCartItems, setNumberOfCartItems }}>
      {children}
    </CartContext.Provider>
  )
}