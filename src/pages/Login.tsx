import PageTransition from "@/components/PageTranstion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authContext } from "@/context/authContext";
import { loginFormShema } from "@/lib/validateShema";
import { sleep } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

function Login() {
  const { signIn } = useContext(authContext);
  const navigate = useNavigate();
  // create form
  const form = useForm<z.infer<typeof loginFormShema>>({
    resolver: zodResolver(loginFormShema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (value: z.infer<typeof loginFormShema>) => {
    await sleep(300);
    try {
      const result = await signIn({
        email: value.email,
        password: value.password,
      });
      if (result.sucsses) {
        toast.success("با موفقیت وارد شدید🎉", {
          description: "به پنل خوش اومدی عزیز دل!",
          duration: 3000,
        });
        await sleep(300);
        navigate("/dashboard");
        return;
      }

      throw new Error(result.error || "ورود ناموفق بود");
    } catch (error) {
      toast.error("ورود ناموفق بود 😞", {
        description: "لطفا اطلاعات خود را صحیح وارد کنید!.",
        duration: 3000,
      });
      form.setError("root", {
        message: "ایمیل و یا کلمه عبور نادرست است!.",
      });
    }
  };

  return (
    <PageTransition>
      <div className="h-screen w-full grid place-items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-mikhak font-bold">
              ورود به حساب کاربری
            </CardTitle>
            <CardDescription>
              ایمیل و کلمه عبور خود را وارد کنید
            </CardDescription>
            <CardAction>
              <Link to={"/register"} className="cursor-pointer">
                <Button variant="link" className="cursor-pointer">
                  ایجاد حساب
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
                        <FormLabel>کلمه عبور</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            {...field}
                            className="font-bold placeholder:text-xs placeholder:font-light"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage className="font-bold text-xs" />
                      </FormItem>
                    )}
                  />
                  <CardFooter className="flex-col gap-2">
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
                        ورود به حساب
                      </Button>
                    )}
                    {form.formState.errors.root && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.root.message}
                      </p>
                    )}
                  </CardFooter>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

export default Login;
