import { Footer } from "@/src/components/common/Footer";
import { Header } from "@/src/components/common/Header";
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