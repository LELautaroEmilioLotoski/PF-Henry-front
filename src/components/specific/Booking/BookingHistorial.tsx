"use client";
import React, { useEffect, useState } from "react";
import { cancelledReservation } from "@/helpers/reservations.helper";
import { IReservations } from "@/interfaces/Types";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import { getReservations } from "@/helpers/user.helper";

const BookingHistorial = () => {
  const { userNormal } = useUserContext();
  const [reservations, setReservations] = useState<IReservations[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("user");
      if (!token) return;

      const user = JSON.parse(token);

      try {
        const response = await getReservations(user.email);
        const reservationArray = response.data;
        if (reservationArray) {
          setReservations(reservationArray);
        } else {
          setReservations([]);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setReservations([]);
      }
    };
    fetchReservations();
  }, [userNormal]);

  const cancelReservations = async (id: string) => {
    try {
      await cancelledReservation(id);
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: "cancelled" } : reservation
        )
      );
      alert("Reservation successfully cancelled");
    } catch (error) {
      console.error("Error cancelling the reservation:", error);
      alert("Could not cancel the reservation");
    }
  };

  const handleSortByStatus = () => {
    const sortedReservations = [...reservations].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    });
    setReservations(sortedReservations);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Reservation History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th
                onClick={handleSortByStatus}
                className="px-2 md:px-4 py-2 md:py-3 cursor-pointer text-sm md:text-base text-left font-semibold text-gray-600"
              >
                Reservation Date
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Number of People
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Schedule
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Reservation Status
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                  {reservation.date}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                  {reservation.guest}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                  {reservation.time}
                </td>
                <td className={`px-2 md:px-4 py-2 md:py-3 text-sm md:text-base font-semibold capitalize ${reservation.status === "confirmed" ? "text-green-500" : "text-red-500"}`}>
                  {reservation.status}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3">
                  {reservation.status === "confirmed" && (
                    <button
                      onClick={() => cancelReservations(reservation.id)}
                      className="bg-red-500 text-white py-1 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <Link href="/createBooking" className="px-3 md:px-4 py-2 bg-gray-200 text-xs md:text-sm rounded-lg hover:bg-gray-300">
          Create Reservation
        </Link>
      </div>
    </div>
  );
};

export default BookingHistorial;