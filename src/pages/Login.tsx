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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  return (
    <div className="h-screen w-full grid place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-mikhak font-bold">
            ورود به حساب کاربری
          </CardTitle>
          <CardDescription>ایمیل و کلمه عبور خود را وارد کنید</CardDescription>
          <CardAction>
            <Button variant="link">ایجاد حساب</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">ایمیل </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between w-full">
                  <Label htmlFor="password">کلمه عبور</Label>
                  <a
                    href="#"
                    className="mr-auto inline-block text-xs underline-offset-4 hover:underline"
                  >
                    فراموشی کلمه عبور؟
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer font-semibold">
            ورود به حساب کاربری
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
