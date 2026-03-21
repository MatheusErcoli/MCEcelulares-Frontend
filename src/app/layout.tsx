import { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "../contexts/CartContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className="bg-[url('/img/home-background.png')] bg-fixed bg-top bg-repeat-y bg-[size:100%_auto]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

export default Layout;