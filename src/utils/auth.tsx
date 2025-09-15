import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouterState, useRouter } from "@tanstack/react-router";

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
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const config: any = { withCredentials: true };

  const token = Cookies.get("access_token");
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    config.headers = { Authorization: `Bearer ${token}` };
  }

  // call your backend /auth/me to get user (server must verify token/cookie)
  const fetchUser = async () => {
    setLoading(true);
    try {
      console.log("Getting user profile details");

      const res = await axios.get(
        "https://talk-l955.onrender.com/api/v1/auth/get-user-profile"
      );

      const userData = res.data.data;

      console.log("user id:", userData.user_id);

      const loggedInUser: User = {
        id: userData.user_id ?? "",
        first_name: userData.first_name ?? "",
        last_name: userData.last_name ?? "",
        email: userData.email ?? "",
        profileImageUrl: userData.profile_image_url ?? "",
        userRole: userData.user_role ?? "",
      };

      setUser(loggedInUser);
    } catch (err) {
      setUser(null);
      router.navigate({ to: pathname });
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
