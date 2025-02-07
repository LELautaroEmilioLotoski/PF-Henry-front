"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { reservation } from "@/helpers/reservations.helper";
import TimeInput from "./TimeInput";
import GuestsInput from "./GuestInput";
import Calendar from "./CalendarComponent";
import type React from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify"; // Importación de Toastify
import "react-toastify/dist/ReactToastify.css";

export default function CreateReservation() {
  const { userNormal } = useUserContext();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
      const user = JSON.parse(storedToken);
      const id = userNormal?.id || user.id;
      setUserId(id);
    }
  }, [userNormal]);

  if (token === null) return <p>Loading...</p>;
  if (!userId) return <p>User could not be identified.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || guests < 1) {
      toast.error("Please fill in all the details."); // Toastify en lugar de alert
      return;
    }

    // Validación: no permitir una fecha menor a la fecha actual.
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Se ignoran las horas para comparar solo la fecha
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error("The selected date cannot be in the past.");
      return;
    }

    setLoading(true);
    const userData = {
      date: date.toISOString().split("T")[0],
      time,
      guest: guests,
    };

    try {
      const bookingData = await reservation(userId, userData);
      if (!bookingData) {
        console.error("Reservation creation failed: no data returned.");
        toast.error("Reservation creation failed. Please try again.");
        setLoading(false);
        return;
      }
      console.log(bookingData);
      toast.success("Reservation created successfully."); // Toastify en lugar de alert
      setDate(undefined);
      setTime("");
      setGuests(1);
      router.push("/getBooking");
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("Error creating reservation."); // Toastify en lugar de alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex justify-center text-2xl font-bold mb-4">Reservations Management</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 space-y-6 bg-white border rounded-lg shadow-md"
      >
        <div className="space-y-2">
          <Calendar selected={date} onSelect={setDate} />
        </div>
        <TimeInput time={time} setTime={setTime} />
        <GuestsInput guests={guests} setGuests={setGuests} />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create reservation"}
        </button>
      </form>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
