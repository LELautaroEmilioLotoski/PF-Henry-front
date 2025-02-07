'use client';
 
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAllReservations, getReservationsByEmail, updateReservationStatus, cancelReservation } from "@/helpers/auth.helper";
 
export interface IUser {
  id: string;
  email: string;
  name: string;
}
 
export interface IReservationTable {
  id: string;
  date: string;
  time: string;
  guest: number;
  status: string;
  create_at: string;
  userId: IUser;
}
 
export default function ReservationsPage() {
  console.log("🟢 El componente ReservationsPage se está renderizando");
  const [reservations, setReservations] = useState<IReservationTable[]>([]);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
 
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (!storedToken) return;
 
    setToken(storedToken);
    fetchReservations(storedToken);
  }, []);
 
  const fetchReservations = async (token: string) => {
    try {
      const data = await getAllReservations(token);
      setReservations(Array.isArray(data) ? data : []);
    } catch {
      setReservations([]);
    }
  };
 
  const handleSearch = async () => {
    if (!email || !token) return;
    try {
      const data = await getReservationsByEmail(email, token);
 
      setReservations(Array.isArray(data) ? data : []);
    } catch {
      setReservations([]);
    }
  };
 
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      const updatedReservation = await updateReservationStatus(id, newStatus, token);
 
 
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: newStatus } : reservation
        )
      );
    } catch (error) {
      console.error("❌ Error al actualizar la reserva:", error);
    }
  };
 
  // const handleCancelReservation = async (id: string) => {
  //   if (!token) return;
  //   try {
  //     const canceledReservation = await cancelReservation(id, token);
  //     console.log("✅ Reserva cancelada:", canceledReservation);
 
  //     setReservations((prevReservations) =>
  //       prevReservations.map((reservation) =>
  //         reservation.id === id ? { ...reservation, status: "cancelada" } : reservation
  //       )
  //     );
  //   } catch (error) {
  //     console.error("❌ Error al cancelar la reserva:", error);
  //   }
  // };
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Reservas</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={handleSearch} disabled={!token}>Buscar</button>
 
      </div>
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
  <thead>
    <tr className="bg-gray-200">
      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Guest</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-300">
    {reservations.map((reservation) => (
      <tr key={reservation.id} className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2">{reservation.userId?.name || "Not available"}</td>
        <td className="border border-gray-300 px-4 py-2">{reservation.userId?.email || "Not available"}</td>
        <td className="border border-gray-300 px-4 py-2">{reservation.date}</td>
        <td className="border border-gray-300 px-4 py-2">{reservation.time}</td>
        <td className="border border-gray-300 px-4 py-2">{reservation.guest || "Not available"}</td>
        <td className="border border-gray-300 px-4 py-2">
          <select
            className="border border-gray-300 p-1 rounded"
            value={reservation.status}
            onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
          >
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}