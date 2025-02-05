// 'use client';
// import { useEffect, useState } from "react";
// import { getAllReservations, getReservationsByEmail, updateReservationStatus, cancelReservation } from "@/helpers/auth.helper";
// import { IReservations } from "@/interfaces/Types";
// import { useUserContext } from "@/context/UserContext"; 

// const GetAllReservations = () => {
//   const { token, setToken } = useUserContext(); 
//   const [reservations, setReservations] = useState<IReservations[]>([]);
//   const [email, setEmail] = useState("");

//   useEffect(() => {
    
//     console.log("Token desde el contexto:", token);

    
//     if (!token) {
//       const storedToken = localStorage.getItem("token");
//       console.log("Token obtenido desde localStorage:", storedToken);
//       if (storedToken) {
//         console.log("Token en localStorage encontrado, se actualizará en el contexto.");
//         setToken(storedToken);  // Actualiza el token si se obtiene del localStorage
//       } else {
//         console.error("No se encontró el token ni en el contexto ni en localStorage");
//         return;
//       }
//     }

//     // Si el token está disponible, procedemos a obtener las reservas
//     if (token) {
//       const fetchReservations = async () => {
//         try {
//           console.log("Token disponible, obteniendo reservas...");
//           const data = await getAllReservations(token);
//           // setReservations(data);
//           console.log("Reservas obtenidas:", data);
//         } catch (error) {
//           console.error("Error fetching reservations:", error);
//         }
//       };

//       fetchReservations();
//     } else {
//       console.error("Token no disponible al intentar obtener reservas");
//     }
//   }, [token, setToken]);  // Dependiendo del token, se ejecuta al cargar el componente o cuando el token cambia

//   useEffect(() => {
//     if (token && email.trim()) {
//       console.log("Buscando reservas por email:", email);
//       handleSearchByEmail();  // Llamar a la función de búsqueda después de que el token y el email estén disponibles
//     }
//   }, [token, email]);  // Este efecto depende de "token" y "email"

//   const handleSearchByEmail = async () => {
//     if (!email.trim()) {
//       console.log("Email vacío, no se puede buscar.");
//       return;
//     }

//     if (!token) {
//       console.error("Token no disponible en la función de búsqueda");
//       return;
//     }

//     try {
//       console.log("Buscando reservas para el email:", email);
//       const data = await getReservationsByEmail(email, token);
//       // setReservations(data);
//       console.log("Reservas encontradas por email:", data);
//     } catch (error) {
//       console.error("Error fetching reservations by email:", error);
//     }
//   };

//   const handleUpdateStatus = async (id: string, status: string) => {
//     console.log(`Actualizando estado de la reserva ${id} a ${status}`);
//     try {
//       await updateReservationStatus(id, status, token);
//       const updatedReservations = reservations.map((res) =>
//         res.id === id ? { ...res, status } : res
//       );
//       setReservations(updatedReservations);
//       console.log("Reserva actualizada correctamente", updatedReservations);
//     } catch (error) {
//       console.error("Error updating reservation:", error);
//     }
//   };

//   const handleCancel = async (id: string) => {
//     console.log(`Cancelando la reserva ${id}`);
//     try {
//       await cancelReservation(id, token);
//       const updatedReservations = reservations.map((res) =>
//         res.id === id ? { ...res, status: "cancelled" } : res
//       );
//       setReservations(updatedReservations);
//       console.log("Reserva cancelada correctamente", updatedReservations);
//     } catch (error) {
//       console.error("Error cancelling reservation:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Gestión de Reservas</h2>
//       <div className="search">
//         <input
//           type="text"
//           placeholder="Buscar por email..."
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={handleSearchByEmail}>Buscar</button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Usuario</th>
//             <th>Fecha</th>
//             <th>Hora</th>
//             <th>Estado</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(reservations || []) .map((reservation) => (
//             <tr key={reservation.id}>
//               <td>{reservation.userId?.email || "No disponible"}</td>
//               <td>{reservation.date}</td>
//               <td>{reservation.time}</td>
//               <td>{reservation.status}</td>
//               <td>
//                 <select
//                   value={reservation.status}
//                   onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
//                 >
//                   <option value="confirmed">Confirmada</option>
//                   <option value="cancelled">Cancelada</option>
//                   <option value="finished">Finalizada</option>
//                 </select>
//                 <button onClick={() => handleCancel(reservation.id)}>Cancelar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <style jsx>{`
//         .container {
//           padding: 20px;
//         }
//         .search {
//           margin-bottom: 20px;
//         }
//         input {
//           padding: 10px;
//           margin-right: 10px;
//         }
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th, td {
//           padding: 10px;
//           border: 1px solid #ddd;
//           text-align: center;
//         }
//         select, button {
//           margin: 5px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GetAllReservations;


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