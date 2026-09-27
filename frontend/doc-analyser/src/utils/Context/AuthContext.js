// contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { LocalStorage, requestHandler } from "../app";
import { UserLogin, userRegister } from "@/api/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AuthContext = createContext({
  user: null,
  token: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error initializing auth:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = async (data) => {
    setIsLoading(true);
    setError(null);
    await requestHandler(
      async () => userRegister(data),
      setIsLoading,
      (res) => {
        router.push("/login");
      },
      (err) => {
        console.log("error", err);
        setError(err);
        toast.error(err);
      },
    );
  };

  const login = async (data) => {
    setIsLoading(true);
    setError(null);
    await requestHandler(
      async () => UserLogin(data),
      setIsLoading,
      (res) => {
        console.log("res data", res);

        const accessToken = res.access_token;
        const user = res.user;
        LocalStorage.set(accessToken, user);
        setIsAuthenticated(true);
        router.push("/dashboard");
      },
      (err) => {
        setError(err);
        toast.error(err);
      },
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthContext, AuthProvider };
