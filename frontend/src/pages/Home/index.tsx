import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { getProfile } from "../../store/reducers/authSlice";
import styles from "./style.module.css";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Если есть токен, загружаем профиль пользователя
    if (isAuthenticated && !user) {
      dispatch(getProfile());
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <div className={styles.container}>
      {/* Hero секция */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Добро пожаловать в Style Matrix!</h1>
        <p className={styles.subtitle}>
          Виртуальная 3D-примерочная с AI-аватарами
        </p>
      </section>

      {/* Главный контент */}
      <div className={styles.mainContent}>
        {/* Секция с аватаром */}
        <section className={styles.avatarSection}>
          <h2 className={styles.sectionTitle}>Ваш 3D-аватар</h2>
          <div className={styles.avatarPlaceholder}>
            <div className={styles.avatarIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles.icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <p className={styles.placeholderText}>
              3D-аватар появится здесь после авторизации
            </p>
            {isAuthenticated && (
              <p className={styles.userWelcome}>Привет, {user?.name || user?.email}!</p>
            )}
          </div>
        </section>

        {/* Секция с одеждой */}
        <section className={styles.clothingSection}>
          <h2 className={styles.sectionTitle}>Гардероб</h2>
          <div className={styles.clothingGrid}>
            <div className={styles.clothingCard}>
              <div className={styles.clothingImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.clothingIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h3 className={styles.clothingTitle}>Футболка</h3>
              <p className={styles.clothingDesc}>Базовая футболка</p>
            </div>

            <div className={styles.clothingCard}>
              <div className={styles.clothingImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.clothingIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h3 className={styles.clothingTitle}>Джинсы</h3>
              <p className={styles.clothingDesc}>Классические джинсы</p>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
};

export default Home;
