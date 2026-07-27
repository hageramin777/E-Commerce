"use client"

import React, { createContext, ReactNode, useState } from "react"

export const WishlistContext = createContext({
  numberOfWishlistItems: 0,
  setNumberOfWishlistItems: (value: number) => {},
})

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [numberOfWishlistItems, setNumberOfWishlistItems] = useState(0)

  return (
    <WishlistContext.Provider value={{ numberOfWishlistItems, setNumberOfWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  )
}