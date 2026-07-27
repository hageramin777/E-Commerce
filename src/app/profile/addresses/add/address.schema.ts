import * as zod from "zod"

export const addressSchema = zod.object({
  name: zod
    .string()
    .trim()
    .min(2, "Enter an address name"),
  city: zod
    .string()
    .trim()
    .min(2, "Enter your city"),
  phone: zod
    .string()
    .trim()
    .regex(
      /^\+?[0-9]{10,15}$/,
      "Enter a valid phone number"
    ),
  details: zod
    .string()
    .trim()
    .min(5, "Enter complete address details"),
})

export type AddressFormValues = zod.infer<typeof addressSchema>
