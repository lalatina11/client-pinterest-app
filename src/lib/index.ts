import axios from "axios";

export const apiRequest = axios.create({ baseURL: import.meta.env.VITE_API_KEY || "http://localhost:3030", withCredentials: true })