import PageTransition from "@/components/PageTranstion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerFormSchema as formSchema } from "@/lib/validateShema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useContext } from "react";
import { authContext } from "@/context/authContext";
import { Loader2Icon } from "lucide-react";
import { sleep } from "@/lib/helper";
import { toast } from "sonner";
function Register() {
  const { signUp } = useContext(authContext);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  async function onSubmitHandler(values: z.infer<typeof formSchema>) {
    await sleep(500);
    try {
      const result = await signUp({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      if (result.sucsses) {
        toast.success("با موفقیت وارد شدید🎉", {
          description: "به پنل خوش اومدی عزیز دل!",
          duration: 3000,
        });
        await sleep(300);
        navigate("/dashboard");
        return;
      } else {
        console.error("Registration failed:", result.error);
        throw new Error("خطا در ثبت اطلاعات رخ داد.");
      }
      // Handle errors here
    } catch (error) {
      form.setError("root", {
        type: "register",
        message: "خطا در ثبت نام. لطفا دوباره تلاش کنید.",
      });
      console.error("Registration error:", error);
    }
  }
  return (
    <PageTransition>
      <div className="h-screen w-full grid place-items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-mikhak font-bold">
              ایجاد حساب کاربری
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              برای شروع حساب کاربری خود را ایجاد کنید
            </CardDescription>
            <CardAction>
              <Link to={"/login"} className="cursor-pointer">
                <Button variant="link" className="cursor-pointer">
                  ورود به حساب
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام شما</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="مثال : محمد"
                            {...field}
                            type="text"
                            className="font-bold placeholder:text-xs placeholder:font-light"
                          />
                        </FormControl>

                        <FormMessage className="font-bold text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ایمیل</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@gmail.com"
                            {...field}
                            className="font-bold placeholder:text-xs placeholder:font-light"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage className="font-bold text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> کلمه عبور</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="حداقل 6 کارکتر"
                            {...field}
                            className="font-bold placeholder:text-xs placeholder:font-light"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage className="font-bold text-xs" />
                      </FormItem>
                    )}
                  />
                  {form.formState.isSubmitting || form.formState.isLoading ? (
                    <Button size="sm" disabled>
                      <Loader2Icon className="animate-spin" />
                      لطفا صبر کنید...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full cursor-pointer font-semibold"
                    >
                      ایجاد حساب کاربری
                    </Button>
                  )}
                  {form.formState.errors.root && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.root.message}
                    </p>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

export default Register;
