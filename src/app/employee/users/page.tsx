"use client";

import { useEffect, useState } from "react";
import { getActiveUsers } from "@/helpers/auth.helper"; // Asegúrate de crear este helper
import { IUser } from "@/interfaces/Types"; // Define un tipo para los usuarios si aún no lo tienes

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getActiveUsers();
        setUsers(data);
      } catch {
        setError("Error al cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Usuarios Activos</h1>
      <ul className="bg-white p-4 rounded shadow">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="border-b py-2">
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <p>No hay usuarios activos.</p>
        )}
      </ul>
    </div>
  );
};

export default UsersPage;
