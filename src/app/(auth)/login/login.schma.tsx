import * as zod from "zod"

export const loginSchema = zod.object({
  email: zod
    .string()
    .nonempty("email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email address"
    ),

  password: zod
    .string()
    .nonempty("password is required")
    .min(6, "password must be at least 6 characters"),
})

export type loginDataType = zod.infer<typeof loginSchema>