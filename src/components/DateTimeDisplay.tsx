import { useEffect, useState } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import moment from "jalali-moment";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Card, CardContent } from "./ui/card";

dayjs.extend(jalaliday);
dayjs.extend(utc);
dayjs.extend(timezone);

export const DateTimeDisplay = () => {
  const [now, setNow] = useState(dayjs.tz(new Date(), "Asia/Tehran"));
  useEffect(() => {
    const interval = setInterval(() => {
      const current = dayjs.tz(new Date(), "Asia/Tehran");
      console.log("ISO:", current.toISOString());
      setNow(current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const jalali = now.calendar("jalali").locale("fa");
  const dayName = jalali.format("dddd"); // پنج‌شنبه
  const time = jalali.format("HH:mm:ss");
  let todayJalali = moment().locale("fa").format("D MMMM YYYY");
  return (
    <Card className="text-center py-3 px-2 text-xs font-mikhak font-semibold flex justify-center items-center gap-4">
      <CardContent className="px-0 flex gap-3">
        <span>
          📅 {dayName} {todayJalali}
        </span>
        <span className="font-mono">🕒 {time}</span>
      </CardContent>
    </Card>
  );
};
