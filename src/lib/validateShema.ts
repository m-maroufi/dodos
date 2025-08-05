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

export const addTodoFormShema = z.object({
  title: z.string("عنوان نمیتواند خالی باشد").min(4, "عنوان حداقل 4 حروف باشد"),
  description: z
    .string()
    .min(5, "توضیحات باید حداقل ۵ حرف باشد")
    .optional()
    .or(z.literal("")), // برای اینکه مقدار خالی رو هم قبول کنه

  priority: z
    .union([
      z.literal("low"),
      z.literal("medium"),
      z.literal("high"),
      z.literal(""),
    ])
    .refine((val) => val !== "", {
      message: "لطفاً یک اولویت را انتخاب کنید",
    }),
  status: z
    .union([
      z.literal("pending"),
      z.literal("doing"),
      z.literal("done"),
      z.literal(""),
    ])
    .refine((val) => val !== "", {
      message: "لطفاً وضعیت را انتخاب کنید",
    }),
  due_date: z.string("تاریخ را انتخاب کنید."),
});
