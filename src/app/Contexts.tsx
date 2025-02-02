import { CartContextProvider } from "@/context/CartContext";
import { UserContextProvider } from "@/context/UserContext";
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
