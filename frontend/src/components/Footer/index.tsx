// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 3D Fitting Room. Все права защищены.</p>
        <p className="mt-2">
          <a href="/contact" className="text-blue-400 hover:underline">
            Контакты
          </a>{" "}
          |
          <a href="/privacy" className="text-blue-400 hover:underline ml-2">
            Приватность
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
