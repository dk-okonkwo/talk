import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export type User = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  profileImageUrl?: string;
  userRole?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  fetchUser: () => Promise<void>;
  setUser: (u: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("access_token");
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // call your backend /auth/me to get user (server must verify token/cookie)
  const fetchUser = async () => {
    setLoading(true);
    try {
      // If you store token in a JS cookie, add Authorization header:
      // const token = Cookies.get("access_token");
      // axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const res = await axios.get("/api/v1/auth/me"); // change to your real endpoint
      setUser(res.data.user ?? null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    // clear server cookie + client state
    Cookies.remove("access_token"); // if you set it client-side
    setUser(null);
    // optionally call logout endpoint to clear server cookies
    };
    
    const value = useMemo(
      () => ({
        user,
        loading,
        isAuthenticated: !!user,
        fetchUser,
        setUser,
        logout,
      }),
      [user, loading] // memoize
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
