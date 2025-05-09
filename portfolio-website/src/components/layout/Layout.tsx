import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../theme/ThemeProvider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Navbar />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
