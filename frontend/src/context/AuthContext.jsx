import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);
const STORAGE_KEY = "mht-session";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const cached = window.localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  async function login(userId) {
    const normalizedId = userId.trim().toUpperCase();
    const isPatient = normalizedId.startsWith("PAT");
    const endpoint = isPatient
      ? `/patients/${normalizedId}`
      : `/doctors/${normalizedId}`;

    setLoading(true);
    try {
      const { data } = await api.get(endpoint);
      const nextSession = {
        userId: normalizedId,
        role: isPatient ? "PATIENT" : "DOCTOR",
        profile: data.patient ?? data.doctor,
      };
      setSession(nextSession);
      return nextSession;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
