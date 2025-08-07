import type { Todo } from "@/hooks/useTodos";
import { statusMap } from "@/lib/helper";
import DropdownMenuWithSubMenu from "./customized/dropdown-menu/dropdown-menu-05";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CheckCircle2 } from "lucide-react";
type ProsType = {
  todos: Todo[] | null;
  loading: boolean;
  onSuccess?: () => void;
};

const TodoList = ({ todos, loading, onSuccess }: ProsType) => {
  return (
    <>
      {loading ? (
        <>
          <h1 className="font-black text-2xl">در حال بروزرسانی لیست ...</h1>
        </>
      ) : (
        <ul className="px-4">
          {todos?.length ? (
            <>
              {todos.map((todo: Todo) => (
                <li className=" px-2" key={todo.id}>
                  <div className="text-sm flex items-center justify-between">
                    <div className="right flex items-center gap-3">
                      <Badge
                        variant={
                          todo.priority == "low"
                            ? "outline"
                            : todo.priority == "high"
                            ? "destructive"
                            : "default"
                        }
                      >
                        اولویت {statusMap[todo.priority ?? ""] || "نامشخص"}{" "}
                      </Badge>
                      <div>
                        <h1 className="scroll-m-20 text-lg font-extrabold tracking-tight text-balance">
                          {todo.title}
                        </h1>
                        <p className="leading-7 [&:not(:first-child)]:mt-0 font-medium">
                          {todo.description}
                        </p>
                      </div>
                    </div>
                    <div className="left pl-5">
                      <DropdownMenuWithSubMenu
                        todo={todo}
                        onSuccess={onSuccess}
                      />
                    </div>
                  </div>
                  <Separator className="my-2" />
                </li>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center text-muted-foreground">
              <CheckCircle2 size={60} className="text-green-500" />
              <h3 className="text-xl font-semibold">
                عالیه! تمام کارها انجام شده 🎉
              </h3>
              <p className="text-sm">هیچ کاری باقی نمونده. می‌تونی لم بدی 😌</p>
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export default TodoList;
