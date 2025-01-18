import { CartContextProvider } from "@/contexts/CartContext";
import { UserContextProvider } from "@/contexts/UserContext";
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
