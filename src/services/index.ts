import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3009/",
  timeout: 9000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("chatforacause@token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
