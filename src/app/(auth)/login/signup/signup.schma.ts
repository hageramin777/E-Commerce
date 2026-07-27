import * as zod from "zod"

export const signupSchema = zod
  .object({
    name: zod.string().nonempty("Enter your name"),

    email: zod.string().email("Enter valid email"),

    password: zod
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#!@$%^&*-]).{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),

    rePassword: zod.string(),

    phone: zod.string().nonempty("Enter your phone"),

    terms: zod.boolean().refine(
      (value) => value === true,
      "You must accept terms"
    ),
  })
  .refine(
    (data) => data.password === data.rePassword,
    {
      message: "password and rePassword not matched",
      path: ["rePassword"],
    }
  )


export type SignUpFormValues = zod.infer<typeof signupSchema>