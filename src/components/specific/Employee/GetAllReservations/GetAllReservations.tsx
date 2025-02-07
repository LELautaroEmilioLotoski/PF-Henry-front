'use client'
 
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAllReservations, getReservationsByEmail, updateReservationStatus, cancelReservation } from "@/helpers/auth.helper";
import { IReservations } from "@/interfaces/Types"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
 
const reservationStatuses = ["pendiente", "confirmada", "cancelada"];
 
export default function ReservationsPage() {
  const [reservations, setReservations] = useState<IReservations[]>([]);
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
 
  const handleStatusChange = async (reservationId: string, newStatus: string) => {
    if (!token) return;
    try {
      await updateReservationStatus(reservationId, newStatus, token);
      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
        )
      );
    } catch {
      // Manejo de error si es necesario
    }
  };
 
  const handleCancelReservation = async (reservationId: string) => {
    if (!token) return;
    try {
      await cancelReservation(reservationId, token);
      setReservations(prevReservations =>
        prevReservations.filter(reservation => reservation.id !== reservationId)
      );
    } catch {
      // Manejo de error si es necesario
    }
  };
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Reservas</h1>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Buscar por email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={!token}>Buscar</Button>
      </div>
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Usuario</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Hora</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {reservation.guest || "No disponible"}
              </td>
              <td className="border border-gray-300 px-4 py-2">{reservation.date}</td>
              <td className="border border-gray-300 px-4 py-2">{reservation.time}</td>
              <td className="border border-gray-300 px-4 py-2 font-semibold capitalize">{reservation.status}</td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <select
                  className="border rounded px-2 py-1 bg-white"
                  value={reservation.status}
                  onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleCancelReservation(reservation.id)}
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}