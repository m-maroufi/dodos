import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { PriorityFilter, StatusFilter } from "@/supabase/api";
import { useState } from "react";

type Status = {
  value: StatusFilter;
  label: string;
};

const statuses: Status[] = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "pending",
    label: "در انتظار",
  },
  {
    value: "doing",
    label: "در حال انجام",
  },
  {
    value: "done",
    label: "انجام شده",
  },
];

type StatusSelectionPropsType = {
  status: StatusFilter;
  statusFiltering: (status: StatusFilter) => void;
};

export function StatusSelection({
  status,
  statusFiltering,
}: StatusSelectionPropsType) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>(status);
  const currentStatusLabel =
    statuses.find((s) => s.value === selectedStatus)?.label || "انتخاب وضعیت";
  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground text-sm">وضعیت</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {currentStatusLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="انتخاب وضعیت ..." />
            <CommandList>
              <CommandEmpty>وضعیت یافت نشد</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(value as StatusFilter);
                      statusFiltering(value as StatusFilter); // صدا زدن تابع فیلتر
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
type Priority = {
  value: PriorityFilter;
  label: string;
};
const priorities: Priority[] = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "low",
    label: "کم",
  },
  {
    value: "medium",
    label: "متوسط",
  },
  {
    value: "high",
    label: "زیاد",
  },
];

type PrioritySelectionPropsType = {
  priority: PriorityFilter;
  priorityFiltering: (priority: PriorityFilter) => void;
};
export function PrioritySelection({
  priority,
  priorityFiltering,
}: PrioritySelectionPropsType) {
  const [openPriority, setOpenPriority] = useState(false);
  const [selectedPriority, setSelectedPriority] =
    useState<PriorityFilter>(priority);
  const currentPriorityLabel =
    priorities.find((s) => s.value === selectedPriority)?.label ||
    "انتخاب وضعیت";
  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground text-sm">اولویت نمایش</p>
      <Popover open={openPriority} onOpenChange={setOpenPriority}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {currentPriorityLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="انتخاب اولویت ..." />
            <CommandList>
              <CommandEmpty>وضعیت یافت نشد</CommandEmpty>
              <CommandGroup>
                {priorities.map((priority) => (
                  <CommandItem
                    key={priority.value}
                    value={priority.value}
                    onSelect={(value) => {
                      setSelectedPriority(value as PriorityFilter);
                      priorityFiltering(value as PriorityFilter); // صدا زدن تابع فیلتر
                      setOpenPriority(false);
                    }}
                  >
                    {priority.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
