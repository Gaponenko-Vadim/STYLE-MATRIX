import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, clearError } from "../../store/reducers/authSlice";
import type { AppDispatch, RootState } from "../../store";
import styles from "./style.module.css";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [isLogin, setIsLogin] = useState(true); // true = логин, false = регистрация
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // Закрываем модалку при успешной авторизации
  useEffect(() => {
    if (isAuthenticated && onSuccess) {
      onSuccess();
    }
  }, [isAuthenticated, onSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Логин
      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );
    } else {
      // Регистрация
      dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        })
      );
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
    setFormData({ email: "", password: "", name: "" });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formTabs}>
        <button
          className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
          onClick={() => {
            setIsLogin(true);
            dispatch(clearError());
          }}
        >
          Войти
        </button>
        <button
          className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
          onClick={() => {
            setIsLogin(false);
            dispatch(clearError());
          }}
        >
          Регистрация
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
              placeholder="Введите ваше имя"
              autoComplete="name"
              disabled={loading}
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@mail.com"
            autoComplete="email"
            disabled={loading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Минимум 6 символов"
            autoComplete={isLogin ? "current-password" : "new-password"}
            disabled={loading}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>

      <div className={styles.switchMode}>
        {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
        <span onClick={switchMode} className={styles.switchLink}>
          {isLogin ? "Зарегистрируйтесь" : "Войдите"}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
