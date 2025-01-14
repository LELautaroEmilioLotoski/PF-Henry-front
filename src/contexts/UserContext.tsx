// 'use client'

// import { IOrder, IUser } from "@/interfaces/Types";
// import { createContext, useEffect, useState } from "react";

// interface IUserContextProps {
//   user: IUser | null;
//   setUser: (user: IUser | null) => void;
//   updateOrders: (order: IOrder) => void;
//   logoutUser: () => void;
// }

// export const UserContext = createContext<IUserContextProps>({
//   user: null,
//   setUser: () => {},
//   updateOrders: () => {},
//   logoutUser: () => {},
// });

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<IUser | null>(null);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     }
//   }, [user]);

//   useEffect(() => {
//     const localUser = localStorage.getItem("user");
//     setUser(localUser ? JSON.parse(localUser) : null);
//   }, []);

//   const updateOrders = (order: IOrder) => {
//     if (!user) return;

//     const updatedUser = {
//       ...user,
//       user: {
//         ...user.user,
//         orders: [...(user.user.orders || []), order],
//       },
//     };

//     setUser(updatedUser);
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//   };

//   const logoutUser = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, updateOrders, logoutUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };