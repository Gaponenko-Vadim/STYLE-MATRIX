// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">3D Fitting Room</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:underline">
                Главная
              </a>
            </li>
            <li>
              <a href="/try-on" className="hover:underline">
                Примерочная
              </a>
            </li>
            <li>
              <a href="/chat" className="hover:underline">
                Чат
              </a>
            </li>
            <li>
              <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
                Войти
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
