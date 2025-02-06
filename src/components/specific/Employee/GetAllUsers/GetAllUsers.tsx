'use client'
import React, { useEffect, useState } from "react";
import { getActiveUsers } from "@/helpers/auth.helper";  // Suponiendo que este es tu helper
import { IUser } from "@/interfaces/Types";

const GetAllUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Obtener los usuarios desde la API
        const response = await getActiveUsers();

        // Transformar los datos para que coincidan con la interfaz IUser
        const transformedUsers = response.map(user => {
          return {
            id: user.id,
            email: user.email,
            roles: user.roles,
            name: user.name,
            address: user.address,
            role: user.role,
            image_url: user.image_url,
            created_atts: user.created_atts,
            // Omitimos las propiedades que no están en la interfaz IUser
          };
        });

        // Actualizar el estado con los usuarios transformados
        setUsers(transformedUsers);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <h1>Usuarios Activos</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
