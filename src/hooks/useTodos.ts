import { getTodos } from "@/supabase/api";
import { useEffect, useState } from "react";

export type Todo = {
  id: number;
  title: string;
  description?: string;
  due_date: string; // یا Date یا number اگه timestamp ذخیره کردی
  status?: string;
  priority: string;
  user_id: string;
  created_at: string;
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const fetchTodo = async () => {
    setLoading(true);
    setError(null);
    const result = await getTodos();

    if (result.success) {
      console.log("refetch", result.data);
      setTodos(result.data ? [...result.data] : []);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodo();
  }, [refreshIndex]);
  // این تابع برای رفرش دستی بیرون داده می‌شه
  const refetch = () => setRefreshIndex((prev) => prev + 1);

  return { todos, refetch, loading, error };
};
