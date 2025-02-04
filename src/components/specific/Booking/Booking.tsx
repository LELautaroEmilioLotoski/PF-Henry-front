"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { reservation } from "@/helpers/auth.helper";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import GuestsInput from "./GuestInput";

export default function CreateReservation() {
  const { userNormal } = useUserContext();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const token = localStorage.getItem("user");
  if (!token) return;

  const usuario = JSON.parse(token);
  console.log(usuario.id);

  const userId = userNormal?.id || usuario.id

  if (!userId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || guests < 1) {
      alert("Completa todos los datos por favor.");
      return;
    }

    const userData = {
      date: date.toISOString().split("T")[0],
      time,
      guest: guests,
    };

    try {
      if (userId) {
        const bookingData = await reservation(userId, userData);
        console.log(bookingData);
        
        alert("Reserva creada correctamente.");
        setDate(undefined);
        setTime("");
        setGuests(1);
      } else {
        alert("No se pudo identificar al usuario.");
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Error al crear la reserva.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 space-y-6 bg-white border rounded-lg shadow-md"
    >
      <DateInput date={date} setDate={setDate} />
      <TimeInput time={time} setTime={setTime} />
      <GuestsInput guests={guests} setGuests={setGuests} />
      <Button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
      >
        Create reservation
      </Button>
    </form>
  );
}
