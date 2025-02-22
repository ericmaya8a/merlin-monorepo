import { Calendar } from "@workspace/ui/components/calendar";
import { Dispatch, SetStateAction } from "react";

interface TicketCalendarProps {
  date?: Date;
  onSelect: (date?: Date) => void;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export function TicketCalendar({
  date,
  onSelect,
  setIsOpen,
}: TicketCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(date) => {
        onSelect(date);
        if (setIsOpen) {
          setIsOpen(false);
        }
      }}
    />
  );
}
