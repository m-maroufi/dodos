import {
  getTodos,
  type PriorityFilter,
  type StatusFilter,
} from "@/supabase/api";
import { useEffect, useState } from "react";

export type Todo = {
  id: string;
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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [dateFilter, setDateFilter] = useState<number>(Date.now());
  const fetchTodo = async () => {
    setLoading(true);
    setError(null);
    const result = await getTodos(statusFilter, priorityFilter, dateFilter);

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
  }, [refreshIndex, statusFilter, priorityFilter, dateFilter]); // رفرش می‌کنه وقتی refreshIndex یا statusFilter تغییر کنه
  // این تابع برای رفرش دستی بیرون داده می‌شه
  const refetch = () => setRefreshIndex((prev) => prev + 1);
  const statusFiltering = (status: StatusFilter) => setStatusFilter(status);
  const priorityFiltering = (priority: PriorityFilter) =>
    setPriorityFilter(priority);
  const dateFiltering = (date: number) => setDateFilter(date);
  return {
    todos,
    refetch,
    loading,
    error,
    statusFiltering,
    statusFilter,
    priorityFilter,
    priorityFiltering,
    dateFilter,
    dateFiltering,
  };
};
