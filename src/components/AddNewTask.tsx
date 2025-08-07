import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus, Loader2Icon } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { addTodoFormShema } from "@/lib/validateShema";

import { useState } from "react";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { sleep } from "@/lib/helper";
import { createNewTask } from "@/supabase/api";
import { toast } from "sonner";
type Props = {
  onSuccess?: () => void;
};
const AddNewTask = ({ onSuccess }: Props) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const form = useForm<z.infer<typeof addTodoFormShema>>({
    resolver: zodResolver(addTodoFormShema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      status: "pending",
      due_date: Date.now(),
    },
  });

  const onSubmitHandler = async (value: z.infer<typeof addTodoFormShema>) => {
    await sleep(500);
    const result = await createNewTask(value);
    console.log(result);

    if (result.success) {
      toast.success("عملیات موفقیت آمیز", {
        description: "کار جدید با موفقیت افزوده شد",
        duration: 3000,
      });
      onSuccess?.();
      await sleep(400);
      setDialogStatus(false);
      form.reset();
    }
  };

  return (
    <Dialog open={dialogStatus} onOpenChange={setDialogStatus}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <CirclePlus className="ml-2" onClick={() => setDialogStatus(true)} />
          ایجاد کار جدید
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-secondary-foreground">
            افزودن کار جدید
          </DialogTitle>
          <DialogDescription>
            تسکی که می‌خواهید اضافه کنید را وارد نمایید.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">عنوان</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثلاً خرید خانه"
                      {...field}
                      className="h-10 font-bold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثلاً: نان، شیر، ماست..."
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 flex-col sm:flex-row">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>اولویت</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب اولویت" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">کم</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="high">زیاد</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاریخ انجام</FormLabel>
                    <DatePicker
                      format="DD - MMMM  YYYY"
                      minDate={new Date()}
                      className="green"
                      value={field.value ? new Date(field.value) : ""}
                      onChange={(date) => {
                        if (date) {
                          const timestamp = date.toDate().getTime(); // تبدیل به timestamp
                          field.onChange(timestamp);
                        } else {
                          field.onChange(undefined);
                        }
                      }}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      inputClass="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="تاریخ را انتخاب کنید"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={form.formState.isSubmitting}
                >
                  انصراف
                </Button>
              </DialogClose>
              {form.formState.isSubmitting || form.formState.isLoading ? (
                <Button size="sm" disabled>
                  <Loader2Icon className="animate-spin" />
                  کمی صبر کنید
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  disabled={!form.formState.isValid}
                >
                  ایجاد کار
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTask;
