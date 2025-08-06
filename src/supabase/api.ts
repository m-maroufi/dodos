import type { addTodoFormShema } from "@/lib/validateShema";
import type z from "zod";
import { supabase } from "./supabaseClient";

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

export const getTodos = async (): Promise<TaskResult> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "کاربر احراز نشده است." };
    }

    // user is ready
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      return { success: false, error: "خطا بارگزاری اطلاعات." };
    }
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return { success: false, error: "خطا بارگزاری اطلاعات." };
  }
};
