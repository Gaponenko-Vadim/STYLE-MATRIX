import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance"; // Импортируем настроенный Axios

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get("/test") // Запрос к /api/test -> http://localhost:5000/test
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Ошибка подключения к серверу");
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">
        Добро пожаловать в 3D-примерочную!
      </h2>
      <p className="text-lg mb-8 text-gray-600">
        Создайте аватар, похожий на вас, и примерьте одежду от любимых брендов в
        3D. Обсудите образы в чате!
      </p>
      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold">
        Создать аватар
      </button>
      {message && (
        <p className="mt-4 text-green-600">Сообщение от сервера: {message}</p>
      )}
    </div>
  );
};

export default Home;
