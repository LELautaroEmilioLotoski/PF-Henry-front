"use client";

import React, { useEffect, useState } from "react";
import { deleteReservation, getReservations } from "@/helpers/auth.helper";
import { IReservation } from "@/interfaces/Types";
import Link from "next/link";

const BookingHistorial = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (userId) {
          const { data } = await getReservations();
          const userReservations = data.filter(
            (reservation: any) => reservation.userId.id === userId
          );
          setReservations(userReservations);
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

  //   if (!userId) {
  //     return <h3>No hay reservas disponibles</h3>;
  //   }
  const deleteReservations = async (id: any) => {
    const { data } = await getReservations();
    const userReservations = data.filter(
      (reservation: any) => reservation.id
    );

    try {
      const res = deleteReservation(userReservations);
      alert("reserva eliminada con exito!")
    } catch (error) {
        alert("no se ha podido eliminar correctamente");
        
    }
  };

  return (
    <div>
      <h1 className="flex justify-center items-center p-5 m-5">
        Historial de Reservas
      </h1>
      {reservations.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {reservations.map((reservation) => (
            <div
              key={reservation.date}
              className="bg-slate-200 w-80 h-60 p-4 rounded shadow-md flex flex-col justify-between"
            >
              <p>Fecha de la reservación: {reservation.date}</p>
              <p>Cantidad de personas: {reservation.guest}</p>
              <p>Horario: {reservation.time}</p>
              <button onClick={deleteReservation}>Eliminar reserva</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay reservas disponibles</p>
      )}
      <div className="flex justify-center p-5 m-4">
        <Link
          href="/createBooking"
          className="flex justify-center items-center border max-w-25 p-4 rounded"
        >
          Crear reserva
        </Link>
      </div>
    </div>
  );
};

export default BookingHistorial;
