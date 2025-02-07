// 'use client';

// import { useState, useEffect } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Select, SelectItem } from '@/components/ui/select';
// import { getAllOrders, getOrdersByEmail, updateOrderStatus } from '@/helpers/auth.helper';
// import { useUserContext } from '@/context/UserContext';
// import { IUser } from '@/interfaces/Types';

// interface IOrder {
//   id: string;
//   status: string;
//   totalPrice: number;
//   createdAt: string;
//   payment_status: string;
//   paymentMethod: string;
//   comment: string;
//   isActive: boolean;
//   orderDetails: { id: string; quantity: number; subtotal: number }[];
//   user?:IUser
// }

// const orderStatuses = ["en preparación", "listo", "entregado"];

// export default function GetAllOrders() {
//   const [orders, setOrders] = useState<IOrder[]>([]);
//   const [email, setEmail] = useState('');
//   const { token } = useUserContext();

//   console.log("Token en OrdersPage:", token);

//   useEffect(() => {
//     if (!token) {
//       console.warn("No hay token disponible");
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const data = await getAllOrders(token);
//         console.log("Datos obtenidos:", data);
//         setOrders(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setOrders([]); // Evita que sea undefined en caso de error
//       }
//     };

//     fetchOrders();
//   }, [token]); // 🔥 Agregamos `token` a la lista de dependencias

//   const handleSearch = async () => {
//     if (!email) return;
//     try {
//       const data = await getOrdersByEmail(email, token);
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching orders by email:', error);
//       setOrders([]); 
//     }
//   };

//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       await updateOrderStatus(orderId, newStatus, token);
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order.id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (error) {
//       console.error('Error updating order status:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Gestión de Órdenes</h1>

//       <div className="flex gap-2 mb-4">
//         <Input
//           type="text"
//           placeholder="Buscar por email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//         />
//         <Button onClick={handleSearch}>Buscar</Button>
//       </div>

//       <table className="w-full border border-gray-200">
//   <thead>
//     <tr className="bg-gray-100">
//       {orders.some(order => order.user?.email) && (
//         <th className="p-2 border">Correo del Usuario</th>
//       )}
//       <th className="p-2 border">Estado</th>
//       <th className="p-2 border">Precio Total</th>
//       <th className="p-2 border">Fecha</th>
//       <th className="p-2 border">Método de Pago</th>
//       <th className="p-2 border">Comentario</th>
//       <th className="p-2 border">Acción</th>
//     </tr>
//   </thead>
//   <tbody>
//     {orders && orders.length > 0 ? (
//       orders.map(order => (
//         <tr key={order.id} className="border">
//           {order.user?.email && (
//             <td className="p-2 border">{order.user.email}</td>
//           )}
//           <td className="p-2 border">{order.status}</td>
//           <td className="p-2 border">${order.totalPrice}</td>
//           <td className="p-2 border">{new Intl.DateTimeFormat('es-ES', { timeZone: 'UTC' }).format(new Date(order.createdAt))}</td>
//           <td className="p-2 border">{order.paymentMethod}</td>
//           <td className="p-2 border">{order.comment || 'Sin comentario'}</td>
//           <td className="p-2 border">
//             <Select
//               value={order.status}
//               onChange={e => handleStatusChange(order.id, e.target.value)}
//             >
//               {orderStatuses.map(status => (
//                 <SelectItem key={status} value={status}>{status}</SelectItem>
//               ))}
//             </Select>
//           </td>
//         </tr>
//       ))
//     ) : (
//       <tr>
//         <td colSpan={orders.some(order => order.user?.email) ? 7 : 6} className="p-2 border text-center">
//           No hay órdenes disponibles
//         </td>
//       </tr>
//     )}
//   </tbody>
// </table>
//     </div>
//   );
// }

'use client';
 
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Cookies from 'js-cookie';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { getAllOrders, getOrdersByEmail, updateOrderStatus } from '@/helpers/auth.helper';
import { IUser} from '@/interfaces/Types';

export interface IOrderEmployee {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  paymentMethod: string;
  comment: string;
  orderDetails: { id: string; quantity: number; subtotal: number }[];
  user?: IUser;
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
    if (!email || !token) return;
    try {
      const data = await getOrdersByEmail(email, token);
  
      // Convertimos totalPrice a number y también convertimos subtotal a number en orderDetails
      const formattedOrders: IOrderEmployee[] = data.map(({ orderDetails, ...order }) => ({
        ...order,
        totalPrice: parseFloat(order.totalPrice), // Convertimos string a number
        orderDetails: orderDetails.map(detail => ({
          ...detail,
          subtotal: parseFloat(detail.subtotal), // Convertimos subtotal de string a number
        })),
      }));
  
      setOrders(formattedOrders);
    } catch {
      setOrders([]);
    }
  };
  

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!token) return;
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
    } catch {
      // Manejo de error si es necesario
    }
  };
 
  return (
    <div>
      <div className="mb-4">
    <div>
      <div className="mb-4">
        <Input
          type="email"
          type="email"
          placeholder="Buscar por email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={!token}>Buscar</Button>
        <Button onClick={handleSearch} disabled={!token}>Buscar</Button>
      </div>

      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            {orders.some(order => order.user?.email) && (
              <th className="border border-gray-300 px-4 py-2 text-left">email</th>
            )}
            <th className="border border-gray-300 px-4 py-2 text-left">Estatus</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Total price</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Payment method</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Comments</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Acctions</th>
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
                No actives orders
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
