import { z } from 'zod/v4'


export const regSchema = z.object({
  email: z.email(),
  password: z.string()
    .min(8, "password should be at least 8 char long")
    .regex(/[A-Z]/, { message: "password should contain at least one uppercase character" })
    .regex(/[1-9]/, "password should contain at least one number")
    .regex(/[*!#$%]/, "password should contain at least one symbol [* ! # % $]"),
  confirmPassword: z.string()

}).check((data) => {
  if (data.value.password !== data.value.confirmPassword) {
    data.issues.push({
      code: "custom",
      message: "Password mismatch",
      input: data.value.password,
      path: ["confirmPassword"]
    })
  }
})

export type RegisterUser = z.infer<typeof regSchema>
