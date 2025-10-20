import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // Прокси автоматически перенаправит на http://localhost:5000
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Важно! Отправляем cookies с каждым запросом
});

// Interceptor для обработки ответов
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если получили 401 и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Пытаемся обновить токен
        await instance.post("/auth/refresh");

        // Повторяем оригинальный запрос
        return instance(originalRequest);
      } catch (refreshError) {
        // Если обновление токена не удалось - редирект на главную
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
