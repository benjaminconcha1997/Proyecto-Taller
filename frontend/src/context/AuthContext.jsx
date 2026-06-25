import { createContext, useContext, useState } from "react";
import { login as loginService } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Inicializa leyendo localStorage, para que la sesión sobreviva a recargas.
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  async function login(email, password) {
    const data = await loginService(email, password);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // isAdmin: hay alguien con sesión iniciada.
  const value = { user, token, login, logout, isAdmin: Boolean(token) };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para consumir el contexto desde cualquier componente.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}