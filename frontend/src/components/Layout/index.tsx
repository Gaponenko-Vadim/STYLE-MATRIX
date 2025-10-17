import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

interface LayoutProps {
  children?: React.ReactNode; // Явно указываем, что принимаем children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children || <Outlet />} {/* Используем children или Outlet */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
