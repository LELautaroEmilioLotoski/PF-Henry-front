'use client'

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAllReservations, getReservationsByEmail, updateReservationStatus, cancelReservation } from "@/helpers/auth.helper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  user: IUser;
}

const reservationStatuses = ["pendiente", "confirmada", "cancelada"];

export default function ReservationsPage() {
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
      setReservations(Array.isArray(data) ? data.map(reservation => ({
        ...reservation,
        user: reservation.user ? { ...reservation.user } : { id: '', email: 'No disponible', name: '' }
      })) : []);
    } catch {
      setReservations([]);
    }
  };

  const handleSearch = async () => {
    if (!email || !token) return;
    try {
      const data = await getReservationsByEmail(email, token);
      setReservations(Array.isArray(data) ? data.map(reservation => ({
        ...reservation,
        user: reservation.user ? { ...reservation.user } : { id: '', email: 'No disponible', name: '' }
      })) : []);
    } catch {
      setReservations([]);
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
            <th className="border border-gray-300 px-4 py-2 text-left">Email del Usuario</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Hora</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Guest</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {reservation.user?.email || "No disponible"}
              </td>
              <td className="border border-gray-300 px-4 py-2">{reservation.date}</td>
              <td className="border border-gray-300 px-4 py-2">{reservation.time}</td>
              <td className="border border-gray-300 px-4 py-2">{reservation.guest || "No disponible"}</td>
              <td className="border border-gray-300 px-4 py-2 font-semibold capitalize">{reservation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
