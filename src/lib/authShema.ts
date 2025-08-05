import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.email("لطفا ایمیل خود را وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
  name: z
    .string("لطفا نام خود را وارد کنید")
    .min(2, "نام باید حداقل 2 کاراکتر باشد"),
});

export const loginFormShema = z.object({
  email: z.email("لطفا ایمیل خود را وارد کنید"),
  password: z.string().min(6, "رمز عبور حداقل 6 کاراکتر است"),
});
