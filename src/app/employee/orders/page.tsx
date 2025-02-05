'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { getAllOrders, getOrdersByEmail, updateOrderStatus } from '@/helpers/auth.helper';
import { IUser } from '@/interfaces/Types';

interface IOrderEmployee {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  paymentMethod: string;
  comment: string;
  orderDetails: { id: string; quantity: number; subtotal: number }[];
  user?: IUser;
}

const orderStatuses = ["en preparación", "listo", "entregado"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrderEmployee[]>([]);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (!storedToken) return;

    setToken(storedToken);
    fetchOrders(storedToken);
  }, []);

  const fetchOrders = async (token: string) => {
    try {
      const data = await getAllOrders(token);
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
    }
  };

  const handleSearch = async () => {
    if (!email || !token) return;
    try {
      const data = await getOrdersByEmail(email, token);
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!token) return;
    try {
      await updateOrderStatus(orderId, newStatus, token);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch {
      // Manejo de error si es necesario
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
        <Button onClick={handleSearch} disabled={!token}>Buscar</Button>
      </div>

      <table className="w-full border-collapse border border-gray-300 shadow-lg">
  <thead>
    <tr className="bg-gray-200">
      {orders.some(order => order.user?.email) && (
        <th className="border border-gray-300 px-4 py-2 text-left">Correo del Usuario</th>
      )}
      <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Precio Total</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Método de Pago</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Comentario</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Acción</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-300">
    {orders.length > 0 ? (
      orders.map(order => (
        <tr key={order.id} className="hover:bg-gray-100">
          {order.user?.email && (
            <td className="border border-gray-300 px-4 py-2">{order.user.email}</td>
          )}
          <td className="border border-gray-300 px-4 py-2 font-semibold capitalize">{order.status}</td>
          <td className="border border-gray-300 px-4 py-2">${order.totalPrice}</td>
          <td className="border border-gray-300 px-4 py-2">
            {new Intl.DateTimeFormat('es-ES', { timeZone: 'UTC' }).format(new Date(order.createdAt))}
          </td>
          <td className="border border-gray-300 px-4 py-2">{order.paymentMethod}</td>
          <td className="border border-gray-300 px-4 py-2">{order.comment || 'Sin comentario'}</td>
          <td className="border border-gray-300 px-4 py-2">
            <Select
              className="border rounded px-2 py-1 bg-white"
              value={order.status}
              onChange={e => handleStatusChange(order.id, e.target.value)}
            >
              {orderStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan={orders.some(order => order.user?.email) ? 7 : 6}
          className="border border-gray-300 px-4 py-2 text-center"
        >
          No hay órdenes disponibles
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
}
