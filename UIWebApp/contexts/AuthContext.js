import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

// PUBLIC_INTERFACE
export const AuthContext = createContext();

/**
 * AuthProvider manages authentication state and provides auth utilities.
 *
 * Usage:
 *   const { user, login, signup, logout, loading } = useAuth();
 * Call `login` or `signup` with credentials. `user` will be set on login.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for user session in localStorage on startup.
  useEffect(() => {
    const userData = localStorage.getItem("foodapp_user");
    setUser(userData ? JSON.parse(userData) : null);
    setLoading(false);
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    localStorage.setItem("foodapp_user", JSON.stringify(res.data.user));
    return res.data.user;
  };

  // PUBLIC_INTERFACE
  const signup = async (email, password, name) => {
    const res = await api.post("/auth/signup", { email, password, name });
    setUser(res.data.user);
    localStorage.setItem("foodapp_user", JSON.stringify(res.data.user));
    return res.data.user;
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    localStorage.removeItem("foodapp_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
