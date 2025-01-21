"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { reservation } from "@/helpers/auth.helper";
import { useUserContext } from "@/context/UserContext";

export default function CreateReservation() {
  const { userNormal } = useUserContext();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);

  const userId = userNormal?.id;

  if (!userId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    if (!date || !time || guests < 1) {
      alert("Completa todos los datos por favor.");
      return;
    }

    const userData = {
      date: date.toISOString().split("T")[0],
      time,
      guest: guests,
    };

    e.preventDefault();
    try {
      const res = await reservation(userId, userData);
      alert("Reserva creada correctamente.");
      setDate(undefined);
      setTime("");
      setGuests(1);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 space-y-6 bg-white border rounded-lg shadow-md"
    >
      <div>
        <Label className="mb-2 block text-sm font-medium text-gray-700">
          Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal border-gray-300 hover:border-gray-400"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
              {date ? format(date, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto rounded-lg shadow-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="time" className="mb-2 block text-sm font-medium text-gray-700">
          Hour
        </Label>
        <Input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <Label htmlFor="guests" className="mb-2 block text-sm font-medium text-gray-700">
          Number of Guests
        </Label>
        <Input
          type="number"
          id="guests"
          min={1}
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <Button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
      >
        Create reservation
      </Button>
    </form>
  );
}
