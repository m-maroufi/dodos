import ComplexDropdownMenu from "@/components/customized/dropdown-menu/dropdown-menu-07";
import { Card, CardContent } from "@/components/ui/card";
import { authContext } from "@/context/authContext";
import { sleep } from "@/lib/helper";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

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
    <div className="min-h-screen backdrop-blur-3xl">
      <Card className="user-menu fixed top-4 right-6 bg-accent p-2">
        <CardContent className="px-3 cursor-pointer">
          <ComplexDropdownMenu
            session={session}
            logOutHandler={logOutHandler}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashborord;
