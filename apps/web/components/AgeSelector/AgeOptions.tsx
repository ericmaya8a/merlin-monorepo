"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { constants, initialStates } from "@workspace/ui/lib/constants";
import { Button } from "@workspace/ui/components/button";
import { OptionItem } from "./OptionItem";

interface ageOptionsProps {
  setTotalAdults: Dispatch<SetStateAction<number>>;
  setTotalKids: Dispatch<SetStateAction<number>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function AgeOptions({
  setTotalAdults,
  setTotalKids,
  setIsOpen,
}: ageOptionsProps) {
  const [options, setOptions] = useState<AgeOptionType[]>([
    { id: "A", text: "Adult (Age 17+)", count: 0 },
    { id: "O", text: "Older kids (Age 8 - 15)", count: 0 },
    { id: "Y", text: "Young kids (Age 2 - 7)", count: 0 },
    { id: "T", text: "Toddlers (Under 2)", count: 0 },
  ]);
  const [basket, setBasket] = useSessionStorage<BasketType>(
    "basket",
    initialStates.basket
  );
  const [ticketData, setTicketData] = useSessionStorage<TicketType>(
    "ticket-desc",
    initialStates.ticketDescription as TicketType
  );

  function handleChange(id: AgeOptionType["id"], val: number) {
    setOptions((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((item) => item.id === id);
      if (newState[index]) {
        newState[index].count = val;
      }
      return newState;
    });
  }

  function getTotalAdults() {
    return options.filter(({ id }) => id === "A")[0]?.count || 0;
    // return options.filter(({ id }) => id === "A")[0].count;
  }

  function getTotalKids() {
    return options
      .filter(({ id }) => id !== "A")
      .reduce((sum, item) => sum + item.count, 0);
  }

  function handleApply() {
    const tickets: TicketType = {
      totalAdults: getTotalAdults(),
      totalKids: getTotalKids(),
      options,
    };
    setTicketData(tickets);
    setIsOpen(false);
    if (basket.tickets.count > 0) {
      setBasket((prevBasket) => {
        const newBasket = { ...prevBasket };
        const count = tickets.totalAdults + tickets.totalKids;
        const gateSubtotal = count * constants.tickets.GATE_PRICE;
        const subtotal = count * constants.tickets.ONLINE_PRICE;
        const savings = gateSubtotal - subtotal;

        newBasket.tickets = {
          count,
          subtotal,
          savings,
        };
        return newBasket;
      });
    }
  }

  useEffect(() => {
    setTotalAdults(getTotalAdults());
    setTotalKids(getTotalKids());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <div>
      {ticketData.options.map((option) => (
        <OptionItem key={option.id} option={option} onChange={handleChange} />
      ))}
      <Button
        className="mt-4 w-full font-bold"
        variant="destructive"
        onClick={handleApply}
      >
        Apply
      </Button>
    </div>
  );
}
