import { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/src/components/common/Header";
import { Footer } from "@/src/components/common/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default Layout;