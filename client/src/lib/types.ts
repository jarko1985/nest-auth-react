import { z } from "zod";

//Sign up validation
export const signUpSchema = z
  .object({
    name: z.string().nonempty("Name is Required"),
    email: z.string().nonempty("Email Address is Required").email(),
    password: z
      .string()
      .nonempty("Password is Required")
      .min(8, "Password must be at least 8 characters length")
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        "password must have at least one special Charachter"
      )
      .regex(/(?=.*[A-Za-z])/, "password must have at least one letter")
      .regex(/.*[0-9].*/, "password must have at least one Number"),
    // confirm_password: z.string().nonempty("Confirm password is Required"),
  })
  // .refine((data) => data.password === data.confirm_password, {
  //   message: "Passwords must match",
  //   path: ["confirm_password"],
  // });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

//Login validation
export const loginSchema = z.object({
  email: z
    .string()
    .email("please provide a valid email address")
    .nonempty("email cannot be empty!"),
  password: z.string().nonempty("password cannot be empty!"),
});

export type TLoginShema = z.infer<typeof loginSchema>;
