import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;