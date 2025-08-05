import ComplexDropdownMenu from "@/components/customized/dropdown-menu/dropdown-menu-07";
import { Card, CardContent } from "@/components/ui/card";
import { authContext } from "@/context/authContext";
import { sleep } from "@/lib/helper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
const Dashborord = () => {
  const { session, signOut } = useContext(authContext);
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
      <div className="container mx-auto">
        <Card className="w-full h-[calc(100vh-7rem)] grid grid-cols-3">
          <div className="completed border-l  overflow-hidden">
            <div className="title">
              <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight text-balance">
                کارهای انجام شده
              </h1>
              <Separator className="my-4" />
            </div>
            <ScrollArea className="h-[calc(100vh-7rem)] w-full">
              <div className="p-4">
                {tags.map((tag) => (
                  <React.Fragment key={tag}>
                    <div className="text-sm">{tag}</div>
                    <Separator className="my-2" />
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="completed border-l">
            <div className="title">
              <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight text-balance">
                در حال انجام
              </h1>
              <Separator className="my-4" />
            </div>
          </div>
          <div className="completed border-l">
            <div className="title">
              <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight text-balance">
                کارهای انجام شده
              </h1>
              <Separator className="my-4" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashborord;
