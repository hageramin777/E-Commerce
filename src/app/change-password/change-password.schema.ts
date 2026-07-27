import * as zod from "zod"

export const changePasswordSchema = zod
  .object({
    currentPassword: zod
      .string()
      .min(6, "Password must be at least 6 characters"),

    password: zod
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#!@$%^&*-]).{8,}$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    rePassword: zod.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  })

export type ChangePasswordValues = zod.infer<
  typeof changePasswordSchema
>
