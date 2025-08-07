import ComplexDropdownMenu from "@/components/customized/dropdown-menu/dropdown-menu-07";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authContext } from "@/context/authContext";
import { sleep } from "@/lib/helper";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import AddNewTask from "@/components/AddNewTask";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTodos } from "@/hooks/useTodos";
import TodoList from "@/components/TodoList";

const Dashborord = () => {
  const { session, signOut } = useContext(authContext);
  const { todos, loading, refetch } = useTodos();
  useEffect(() => {
    console.log("todos updated", todos);
  }, [todos]);
  const navigate = useNavigate();
  const logOutHandler = async () => {
    const { sucsses } = await signOut();
    if (!sucsses) {
      toast.error("خروج ناموفق بود 😞", {
        description: "مشکلی در اتصال پیش آمد.",
        duration: 3000,
      });
      return;
    }
    toast.success("با موفقیت خارج شدید🎉", {
      description: "به امید دیدار مجدد :)",
      duration: 3000,
    });
    await sleep(2000);
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    if (!session) {
      navigate("/login", { replace: true });
    }
  }, [session, navigate]);
  return (
    <div className="min-h-screen backdrop-blur-3xl pt-20">
      <Card className="user-menu fixed top-4 right-6 bg-accent p-2">
        <CardContent className="px-3 cursor-pointer">
          <ComplexDropdownMenu
            session={session}
            logOutHandler={logOutHandler}
          />
        </CardContent>
      </Card>
      <div className="sidebar fixed w-fit right-0 top-1/2 z-20 h-1/2 bg-accent/40 -translate-y-1/2 rounded-l-lg py-2 px-4">
        <ul className="flex flex-col gap-3">
          <li>
            <AddNewTask onSuccess={refetch} />
          </li>
          <li>
            <Button variant="destructive" size="sm">
              <CirclePlus /> برای امروز
            </Button>
          </li>
          <li>
            <Button variant="secondary" size="sm">
              <CirclePlus /> انجام شده ها
            </Button>
          </li>
        </ul>
      </div>
      <Card className="max-w-4xl m-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">برای امروز</CardTitle>
          <Separator className="my-2" />
        </CardHeader>
        <CardContent className="py-0">
          <ScrollArea className="h-[calc(100vh-16rem)] w-full" dir="rtl">
            <TodoList todos={todos} loading={loading} onSuccess={refetch} />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashborord;
