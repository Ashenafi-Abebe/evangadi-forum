import axios from "axios";
const axiosBase = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://evangadi-forum-dvuv.onrender.comapi",
});

export default axiosBase;
