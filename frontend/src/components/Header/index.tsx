import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { logout } from "../../store/reducers/authSlice";
import axios from "../../api/axiosInstance";
import AuthModal from "../AuthModal";
import styles from "./style.module.css";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Вызываем API для очистки cookies на сервере
      await axios.post("/auth/logout");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    } finally {
      // Очищаем Redux state в любом случае
      dispatch(logout());
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            Style Matrix
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <Link to="/" className={styles.navLink}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/fitting-room" className={styles.navLink}>
                  Примерочная
                </Link>
              </li>
              <li>
                <Link to="/chat" className={styles.navLink}>
                  Чат
                </Link>
              </li>
            </ul>

            {isAuthenticated ? (
              <div className={styles.userSection}>
                <span className={styles.userName}>
                  {user?.name || user?.email}
                </span>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            ) : (
              <button
                className={styles.loginButton}
                onClick={() => setIsAuthModalOpen(true)}
              >
                Войти
              </button>
            )}
          </nav>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;
