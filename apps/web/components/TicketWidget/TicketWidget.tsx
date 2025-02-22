"use client";

import { Button } from "@workspace/ui/components/button";
import { initialStates } from "@workspace/ui/lib/constants";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { CalendarSelect } from "./TicketCalendar";
import { TicketSelect } from "./TicketSelect";

export function TicketWidget() {
  const [ticketDate, setTicketDate] = useSessionStorage<Date>(
    "ticket-date",
    new Date()
  );
  const [ticketData] = useSessionStorage<TicketType>(
    "ticket-desc",
    initialStates.ticketDescription as TicketType
  );
  const [dayPrice] = useSessionStorage<1 | 2>("ticket-pass", 1);
  const [totalAdults, setTotalAdults] = useState(ticketData.totalAdults);
  const [totalKids, setTotalKids] = useState(ticketData.totalKids);

  function handleSelectedDate(val?: Date) {
    if (val) {
      setTicketDate(val);
    }
  }

  return (
    <div className="mx-auto w-2/3 p-4">
      <div className="flex flex-wrap">
        <div className="grow-[5] cursor-pointer rounded-l-lg bg-white p-2 text-[#1E274A]">
          <CalendarSelect
            ticketDate={format(ticketDate, "P")}
            calendarDate={ticketDate}
            onSelect={handleSelectedDate}
          />
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <p className="text-xs">Days</p>
          <p className="font-bold">{dayPrice}</p>
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <TicketSelect
            totalAdults={totalAdults}
            setTotalAdults={setTotalAdults}
            setTotalKids={setTotalKids}
          />
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <p className="text-xs">Kids (2-16)</p>
          <p className="font-bold text-[#A1A3AA]">{totalKids || "Select"}</p>
        </div>
        <div className="flex grow-[2] items-center justify-center rounded-r-lg bg-[#E52330] p-2">
          <Button
            className="hover:no-underline"
            variant="link"
            disabled={ticketData.totalAdults < 1}
          >
            <Link className="font-bold text-white" href="/tickets">
              Get tickets
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
