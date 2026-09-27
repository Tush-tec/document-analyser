import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 120000,
});

const userRegister = async (data) => {
  return apiClient.post("/auth/signup", data);
};

const UserLogin = async (data) => {
  return apiClient.post("/auth/login", data);
};

const googleLogin = async () => {
  return apiClient.post("/");
};

export { userRegister, UserLogin, googleLogin };
