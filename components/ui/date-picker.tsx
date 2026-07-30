"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;

  onChange: (date: Date | undefined) => void;

  disabled?: boolean;

  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  disabled = false,
  placeholder = "Seleccionar fecha",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start rounded-xl text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {value ? (
            format(value, "dd 'de' MMMM 'de' yyyy", {
              locale: es,
            })
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto p-0"
      >
        <Calendar
          mode="single"
          locale={es}
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}