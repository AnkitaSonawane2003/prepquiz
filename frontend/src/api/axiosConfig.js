import axios from "axios";

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = token.split(".")[1];
    if (!payload) return true;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const decoded = JSON.parse(json);
    if (!decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp <= now;
  } catch {
    return true;
  }
}

const API = axios.create({
baseURL: import.meta.env.VITE_API_URL || "https://prepquiz.onrender.com",

  timeout: 20000,
});

API.interceptors.request.use(
  (config) => {
   
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("studentToken") ||
      localStorage.getItem("teacherToken") ||
      localStorage.getItem("jwt") ||
      null;

    if (!token) return config; 

    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("studentToken");
      localStorage.removeItem("teacherToken");
      return Promise.reject({ code: "TOKEN_EXPIRED", message: "TOKEN_EXPIRED" });
    }

    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default API;
