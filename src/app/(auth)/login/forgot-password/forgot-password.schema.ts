import * as zod from "zod"


export const forgotPasswordSchema = zod.object({
  email: zod
    .string()
    .email("Enter valid email"),

  newPassword: zod
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#!@$%^&*-]).{8,}$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
})


export type ForgotPasswordValues =
  zod.infer<typeof forgotPasswordSchema>