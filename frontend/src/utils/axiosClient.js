// // src/utils/axiosClient.js
// import axios from 'axios';

// const axiosClient = axios.create({
//   baseURL: "https://codeclan-backend.onrender.com" || "http://localhost:3000",
//   withCredentials: true,
//   headers: { 'Content-Type': 'application/json' },
// });

// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error) // just reject the original error
// );

// export default axiosClient;

import axios from "axios";

const isProd = window.location.hostname !== "localhost";

const axiosClient = axios.create({
  baseURL: isProd
    ? "https://codeclan-backend.onrender.com"
    : "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;

