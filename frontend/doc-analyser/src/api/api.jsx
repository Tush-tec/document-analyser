import { LocalStorage } from "@/utils/app";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = LocalStorage.get("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const userRegister = async (data) => {
  return apiClient.post("/auth/signup", data);
};

const UserLogin = async (data) => {
  return apiClient.post("/auth/login", data);
};

const googleLogin = async () => {
  return apiClient.post("/");
};

const uploadDocuments = async (file) => {
  return apiClient.post("/documents/upload", file);
};

const getDocuments = async () => {
  return apiClient.get("/documents");
};

export { userRegister, UserLogin, googleLogin, uploadDocuments, getDocuments };
