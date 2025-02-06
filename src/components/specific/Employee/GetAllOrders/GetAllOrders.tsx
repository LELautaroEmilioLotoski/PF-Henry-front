'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { getAllOrders, getOrdersByEmail, updateOrderStatus } from '@/helpers/auth.helper';
import { useUserContext } from '@/context/UserContext';
import { IUser } from '@/interfaces/Types';

interface IOrder {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  payment_status: string;
  paymentMethod: string;
  comment: string;
  isActive: boolean;
  orderDetails: { id: string; quantity: number; subtotal: number }[];
  user?:IUser
}

const orderStatuses = ["en preparación", "listo", "entregado"];

export default function GetAllOrders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [email, setEmail] = useState('');
  const { token } = useUserContext();

  console.log("Token en OrdersPage:", token);

  useEffect(() => {
    if (!token) {
      console.warn("No hay token disponible");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(token);
        console.log("Datos obtenidos:", data);
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Evita que sea undefined en caso de error
      }
    };

    fetchOrders();
  }, [token]); // 🔥 Agregamos `token` a la lista de dependencias

  const handleSearch = async () => {
    if (!email) return;
    try {
      const data = await getOrdersByEmail(email, token);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching orders by email:', error);
      setOrders([]); 
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus, token);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Órdenes</h1>

      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Buscar por email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      <table className="w-full border border-gray-200">
  <thead>
    <tr className="bg-gray-100">
      {orders.some(order => order.user?.email) && (
        <th className="p-2 border">Correo del Usuario</th>
      )}
      <th className="p-2 border">Estado</th>
      <th className="p-2 border">Precio Total</th>
      <th className="p-2 border">Fecha</th>
      <th className="p-2 border">Método de Pago</th>
      <th className="p-2 border">Comentario</th>
      <th className="p-2 border">Acción</th>
    </tr>
  </thead>
  <tbody>
    {orders && orders.length > 0 ? (
      orders.map(order => (
        <tr key={order.id} className="border">
          {order.user?.email && (
            <td className="p-2 border">{order.user.email}</td>
          )}
          <td className="p-2 border">{order.status}</td>
          <td className="p-2 border">${order.totalPrice}</td>
          <td className="p-2 border">{new Intl.DateTimeFormat('es-ES', { timeZone: 'UTC' }).format(new Date(order.createdAt))}</td>
          <td className="p-2 border">{order.paymentMethod}</td>
          <td className="p-2 border">{order.comment || 'Sin comentario'}</td>
          <td className="p-2 border">
            <Select
              value={order.status}
              onChange={e => handleStatusChange(order.id, e.target.value)}
            >
              {orderStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </Select>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={orders.some(order => order.user?.email) ? 7 : 6} className="p-2 border text-center">
          No hay órdenes disponibles
        </td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  );
}