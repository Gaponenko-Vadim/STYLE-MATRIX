import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // Прокси автоматически перенаправит на http://localhost:5000
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
