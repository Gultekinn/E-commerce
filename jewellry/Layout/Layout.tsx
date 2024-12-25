import Footer from "../src/components/Navbar/Footer";
import Header from "../src/components/Navbar/Header";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children } : LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
