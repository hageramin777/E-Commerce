import { ProductType } from "./productType"

export interface CartResType {
  cartId: string;
  message: string;
  status: string;
  numOfCartItems: number;

  data: {
    totalCartPrice: number;
    products: CartItemType[];
  };
}

export interface CartItemType {
  count: number;
  price: number;
  product: ProductType;
}