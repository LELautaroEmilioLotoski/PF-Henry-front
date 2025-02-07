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
    <div style={{ margin: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Active Users</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllUsers;
