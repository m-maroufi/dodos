import ComplexDropdownMenu from "@/components/customized/dropdown-menu/dropdown-menu-07";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authContext } from "@/context/authContext";
import { sleep } from "@/lib/helper";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import AddNewTask from "@/components/AddNewTask";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTodos } from "@/hooks/useTodos";
import TodoList from "@/components/TodoList";
import {
  PrioritySelection,
  StatusSelection,
} from "@/components/FilterActionButton";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const Dashborord = () => {
  const { session, signOut } = useContext(authContext);
  const {
    todos,
    loading,
    refetch,
    statusFilter,
    statusFiltering,
    priorityFilter,
    priorityFiltering,
    dateFilter,
    dateFiltering,
  } = useTodos();
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
      <div className="sidebar fixed w-[180px] right-0 top-1/2 z-20 h-1/2 bg-accent/40 -translate-y-1/2 rounded-l-lg py-2 px-4">
        <ul className="flex flex-col gap-3">
          <li>
            <AddNewTask onSuccess={refetch} />
          </li>
          <Separator className="my-2" />
          <li>
            <h3 className="font-bold text-xs">فیلتر بر اساس: </h3>
            <Separator className="my-4" />
            <div className="pr-2">
              <span className="font-medium text-[12px] block mb-1">
                انتخاب تاریخ :
              </span>
              <DatePicker
                format="DD - MMMM  YYYY"
                value={dateFilter ? new Date(dateFilter) : ""}
                onChange={(date) => {
                  if (date) {
                    const timestamp = date.toDate().getTime(); // تبدیل به timestamp
                    dateFiltering(timestamp);
                  } else {
                    dateFiltering(Date.now()); // اگر تاریخ انتخاب نشد، به تاریخ فعلی برگردان
                  }
                }}
                calendar={persian}
                locale={persian_fa}
                containerStyle={{ width: "100%" }}
                calendarPosition="bottom-right"
                inputClass="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="تاریخ را انتخاب کنید"
              />
            </div>
          </li>
        </ul>
      </div>
      <Card className="max-w-4xl m-auto mr-[300px]">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-xl font-bold">برای امروز</CardTitle>
            <div className="filter flex items-center gap-3">
              <StatusSelection
                status={statusFilter}
                statusFiltering={statusFiltering}
              />
              <PrioritySelection
                priorityFiltering={priorityFiltering}
                priority={priorityFilter}
              />
            </div>
          </div>
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
