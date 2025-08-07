import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/hooks/useTodos";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTodoFormShema } from "@/lib/validateShema";
import type z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { deleteTodo, editTodo } from "@/supabase/api";
import { toast } from "sonner";
import { sleep } from "@/lib/helper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  todo: Todo;
  onSuccess?: () => void;
};

export default function DropdownMenuWithSubMenu({ todo, onSuccess }: Props) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [opentDeleteDialog, setOpentDeleteDialog] = useState(false);

  const form = useForm<z.infer<typeof addTodoFormShema>>({
    resolver: zodResolver(addTodoFormShema),
    reValidateMode: "onChange",
    defaultValues: {
      title: todo.title || "",
      description: todo.description || "",
      due_date: Number(todo.due_date) || Date.now(),
      priority: (todo.priority as "low" | "medium" | "high") || "low",
      status: (todo.status as "pending" | "doing" | "done") || "pending",
    },
  });

  const onSubmitHandler = async (value: z.infer<typeof addTodoFormShema>) => {
    const updateData = { ...value, id: todo.id };
    const result = await editTodo(updateData);
    console.log("drop", result);

    if (result.success) {
      toast.success("عملیات موفقیت آمیز", {
        description: "کار جدید با موفقیت افزوده شد",
        duration: 3000,
      });
      onSuccess?.();
    } else {
      toast.error("خطا در عملیات", {
        description: "مشکلی در ویرایش پیش آمد.",
        duration: 3000,
      });
    }
    await sleep(400);
    setOpenEditDialog(false);
    form.reset();
  };

  const deleteHandler = async (id: string) => {
    if (id) {
      const result = await deleteTodo(id);
      if (result.success) {
        toast.success("عملیات موفق", {
          description: "کار مورد نظر با موفقیت حذف شد.",
          duration: 3000,
        });
        await sleep(400);
        setOpentDeleteDialog(false);
        onSuccess?.();
      }
    }
  };

  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-2">
          <DropdownMenuItem
            onClick={() => {
              setOpenEditDialog(true); // اینجا فقط دیالوگ باز میشه
            }}
          >
            ویرایش
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive font-bold"
            onClick={() => setOpentDeleteDialog(true)}
          >
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ویرایش کار</DialogTitle>
            <DialogDescription>
              لطفاً اطلاعات را ویرایش کرده و ذخیره کنید.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      عنوان
                    </FormLabel>
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
                        value={field.value}
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
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-extrabold">وضعیت</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        defaultChecked={true}
                        className="flex justify-between px-6 flex-row-reverse"
                      >
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="pending" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            در انتظار
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="doing" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            در حال انجام
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="done" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            انجام شد
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex justify-end gap-2 pt-4">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setOpenEditDialog(false)}
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
                    disabled={!form.formState.touchedFields}
                  >
                    ویرایش
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* delete alert dialog */}
      <AlertDialog open={opentDeleteDialog} onOpenChange={setOpentDeleteDialog}>
        <AlertDialogContent dir="rtl" className="text-start !justify-start">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-start">
              آیا از حذف اطمینان دارید؟?
            </AlertDialogTitle>
            <AlertDialogDescription>
              کار با عنوان
              <span className="font-bold text-lg text-destructive">
                {todo.title}
              </span>
              حذف خواهد شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteHandler(todo.id)}
              className="bg-destructive font-semibold hover:bg-destructive/95"
            >
              تایید و حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
