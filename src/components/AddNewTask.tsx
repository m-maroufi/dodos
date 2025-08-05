import React from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import type z from "zod";
import { addTodoFormShema } from "@/lib/validateShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem, SelectTrigger } from "./ui/select";
import { SelectContent, SelectValue } from "@radix-ui/react-select";
const AddNewTask = () => {
  const form = useForm<z.infer<typeof addTodoFormShema>>({
    resolver: zodResolver(addTodoFormShema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      due_date: "",
    },
  });

  const onSubmitHandler = async (value: z.infer<typeof addTodoFormShema>) => {
    console.log(value);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.clearErrors();
          form.unregister();
          form.resetField("priority");
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <CirclePlus /> ایجاد کار جدید
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-secondary-foreground">
            افزودن کار جدید
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-6"
          >
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xl">عنوان</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="خریدبرای خانه"
                        {...field}
                        className="font-bold h-11 !text-lg placeholder:text-2xs placeholder:font-bold"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage className="font-bold text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[15px]">
                      توضیحات
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ماست ، سبزی ،پنیر و ..."
                        {...field}
                        className="font-bold text-3xl placeholder:text-2xs placeholder:font-bold"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage className="font-bold text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>میزان اولویت</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="میزان اولویت را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-accent" dir="rtl">
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
                    <FormLabel>میزان اولویت</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  انصراف
                </Button>
              </DialogClose>
              <Button type="submit" variant="default" size={"lg"}>
                ایجاد کار
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTask;
