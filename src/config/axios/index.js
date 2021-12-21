import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  //   withCredentials: false,
});

export default api;
