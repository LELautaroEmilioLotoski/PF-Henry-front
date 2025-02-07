"use client";

import React, { useEffect, useState } from "react";
import { cancelledReservation, getReservations } from "@/helpers/auth.helper";
import { IReservations } from "@/interfaces/Types";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";

const BookingHistorial = () => {
  const { userNormal } = useUserContext();
  const [reservations, setReservations] = useState<IReservations[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("user");
      if (!token) return;

      const usuario = JSON.parse(token);

      try {
        const response = await getReservations(usuario.email);
        setReservations(response.data || []);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setReservations([]);
      }
    };

    fetchReservations();
  }, [userNormal]);

  // Cambiar solo el estado de la reserva sin eliminarla
  const cancelReservations = async (id: string) => {
    try {
      await cancelledReservation(id);
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: "cancelled" } : reservation
        )
      );

      alert("Reserva cancelada con éxito");
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("No se pudo cancelar la reserva");
    }
  };

  // Función para ordenar por estado
  const sortByStatus = () => {
    const sortedReservations = [...reservations].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setReservations(sortedReservations);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Reservation History</h1>
      {reservations.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Guests</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
              <th
                className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-300 transition"
                onClick={sortByStatus}
              >
                Status ⬍
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{reservation.date}</td>
                <td className="border border-gray-300 px-4 py-2">{reservation.guest}</td>
                <td className="border border-gray-300 px-4 py-2">{reservation.time}</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold capitalize">
                  <span
                    className={`${
                      reservation.status === "confirmed" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  {reservation.status === "confirmed" && (
                    <button
                      onClick={() => cancelReservations(reservation.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No reservations available</p>
      )}

      <div className="flex justify-center p-5 m-4">
        <Link
          href="/createBooking"
          className="border px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Create reservation
        </Link>
      </div>
    </div>
  );
};

export default BookingHistorial;
