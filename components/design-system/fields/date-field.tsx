"use client";

import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function DateField({
  value,
  onChange,
  disabled = false,
}: DateFieldProps) {
  const selectedDate = value
    ? parseISO(value)
    : undefined;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Fecha
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="w-full justify-start rounded-xl"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {selectedDate
              ? format(
                  selectedDate,
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: es,
                  }
                )
              : "Seleccionar fecha"}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;

              onChange(
                format(
                  date,
                  "yyyy-MM-dd"
                )
              );
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}