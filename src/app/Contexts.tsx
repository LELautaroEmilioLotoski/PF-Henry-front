<<<<<<< HEAD
import { UserContextProvider } from "@/context/UserContext";
=======
import { CartContextProvider } from "@/contexts/CartContext";
import { UserContextProvider } from "@/contexts/UserContext";
>>>>>>> bab681db52d4f9690989c4ea0541d702fd0b452e
import { UserProvider } from "@auth0/nextjs-auth0/client";

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider>
      <UserProvider>
        <CartContextProvider>
          {children}
          </CartContextProvider>
      </UserProvider>
    </UserContextProvider>
  );
};

export default Contexts;
