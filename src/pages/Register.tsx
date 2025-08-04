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
import { Link } from "react-router";

function Register() {
  return (
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
            <Link to={"/login"}>
              <Button variant="link">ورود به حساب</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">نام شما </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="مثال: محمد"
                  required
                />
              </div>
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
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="شامل  5 کارکتر یا بیشتر"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer font-semibold">
            ایجاد حساب کاربری
          </Button>
          <button></button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
