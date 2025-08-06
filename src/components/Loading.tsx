import { authContext } from "@/context/authContext";
import { Progress } from "@radix-ui/react-progress";
import { useContext, useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(13);
  const { loading } = useContext(authContext);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    if (!loading) {
      setProgress(100);
      return () => clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-screen w-screen grid items-center">
      <div className="container mx-auto">
        <h1>در حال بارگزاری</h1>
        <Progress value={progress} className="w-[80%]" />
      </div>
    </div>
  );
};

export default Loading;
