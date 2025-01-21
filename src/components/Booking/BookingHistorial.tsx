"use client";
import React, { useEffect, useState } from "react";
import { cancelledReservation, getReservations } from "@/helpers/auth.helper";
import { IReservations } from "@/interfaces/Types";
import Link from "next/link";

const BookingHistorial = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [reservations, setReservations] = useState<IReservations[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (userId) {
          const { data } = await getReservations(userId);
          setReservations(data);
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservations();
  }, [userId]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id);
    }
  }, []);

  if (!userId) {
    return null;
  }

  const cancelReservations = async (id: string) => {
    try {
      const response = await cancelledReservation(id);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );

      alert("Reserva cancelada con éxito");
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("No se pudo cancelar la reserva");
    }
  };

  return (
    <div>
      <h1 className="flex justify-center items-center p-5 m-5">
        Reservation history
      </h1>
      {reservations.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-slate-200 w-80 h-60 p-4 rounded shadow-md flex flex-col justify-between"
            >
              <p>Reservation date: {reservation.date}</p>
              <p>Number of people: {reservation.guest}</p>
              <p>Schedule: {reservation.time}</p>
              <p>
                Reservation status:{" "}
                <span
                  className={`${
                    reservation.status === "confirmed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {reservation.status}
                </span>
              </p>

              {reservation.status === "confirmed" && (
                <button
                  onClick={() => cancelReservations(reservation.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  cancel reservation
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No reservations available</p>
      )}
      <div className="flex justify-center p-5 m-4">
        <Link
          href="/createBooking"
          className="flex justify-center items-center border max-w-25 p-4 rounded"
        >
          Create reservation
        </Link>
      </div>
    </div>
  );
};

export default BookingHistorial;
