import type { addTodoFormShema } from "@/lib/validateShema";
import type z from "zod";
import { supabase } from "./supabaseClient";
import dayjs from "dayjs";

type TaskResult = { success: true; data: any } | { success: false; error: any };
export const createNewTask = async (
  todo: z.infer<typeof addTodoFormShema>
): Promise<TaskResult> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "کاربر احراز نشده است." };
    }

    const normalizedTodo = {
      ...todo,
      due_date: new Date(todo.due_date),
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("todos")
      .insert([normalizedTodo]);
    if (error) {
      console.log(error);

      throw new Error(error.message);
    }
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: "خطا در ثبت اطلاعات" };
  }
};
export type StatusFilter = "done" | "doing" | "pending" | "all";
export type PriorityFilter = "low" | "medium" | "high" | "all";
export const getTodos = async (
  status: StatusFilter,
  priority: PriorityFilter,
  date?: number
): Promise<TaskResult> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "کاربر احراز نشده است." };
    }

    let query = supabase.from("todos").select("*").eq("user_id", user.id);
    console.log("Filter params:", { status, priority, date });
    // اگر وضعیت مشخص شده غیر از "all" بود، فیلترش کن
    if (status !== "all") {
      query = query.eq("status", status);
    }
    if (priority !== "all") {
      query = query.eq("priority", priority);
    }
    if (date) {
      const startOfDay = dayjs(date).startOf("day").toISOString();
      const endOfDay = dayjs(date).endOf("day").toISOString();

      query = query.gte("due_date", startOfDay).lte("due_date", endOfDay);
    }
    const { data, error } = await query;

    if (error) {
      return { success: false, error: "خطا بارگزاری اطلاعات." };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return { success: false, error: "خطا بارگزاری اطلاعات." };
  }
};

type TodoUpdate = {
  id: string;
  title?: string;
  description?: string;
  due_date?: number;
  status?: "pending" | "doing" | "done" | "";
  priority?: "low" | "medium" | "high" | "";
};
export const editTodo = async (updates: TodoUpdate): Promise<TaskResult> => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "کاربر احراز نشده است" };
    }
    const { id, ...rest } = updates;

    // ✅ نرمال‌سازی داده قبل از ارسال به Supabase
    const normalizedTodo = {
      ...rest,
      due_date: updates.due_date ? new Date(updates.due_date) : new Date(),
    };

    const { data, error } = await supabase
      .from("todos")
      .update(normalizedTodo)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.log("api", error);
      return { success: false, error: "خطا در عملیات" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: "عملیات با شکست مواجه شد" };
  }
};
export const deleteTodo = async (todoId: string): Promise<TaskResult> => {
  try {
    // گرفتن اطلاعات کاربر
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "کاربر احراز نشده است" };
    }

    // حذف todo فقط اگر متعلق به کاربر باشد
    const { error, data } = await supabase
      .from("todos")
      .delete()
      .eq("id", todoId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("خطا در حذف:", error);
      return { success: false, error: "حذف با خطا مواجه شد" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: "عملیات با شکست مواجه شد" };
  }
};
