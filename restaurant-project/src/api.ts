import axios from "axios";

export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && sessionStorage.getItem("auth_token")) {
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("customer_id");
      sessionStorage.removeItem("rep_id");
    }
    return Promise.reject(error);
  },
);

export function apiErrorMessage(error: unknown, fallback = "The request could not be completed") {
  if (axios.isAxiosError(error)) return error.response?.data?.message || fallback;
  if (error instanceof Error) return error.message;
  return fallback;
}

export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

export async function uploadImage(file: File) {
  const allowedTypes = IMAGE_ACCEPT.split(",");
  if (!allowedTypes.includes(file.type)) throw new Error("Choose a JPEG, PNG, WebP, or GIF image");
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be 5 MB or smaller");

  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post<{ filePath: string }>("/upload", formData);
  if (!response.data.filePath) throw new Error("Image storage did not return an image URL");
  return response.data.filePath;
}

export function imageUrl(value?: string) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_URL}/${value.replace(/^\//, "")}`;
}

export function saveSession(data: { token: string; id: string; role: string }) {
  sessionStorage.setItem("auth_token", data.token);
  sessionStorage.setItem(data.role === "customer" ? "customer_id" : "rep_id", data.id);
}

export function clearSession() {
  sessionStorage.removeItem("auth_token");
  sessionStorage.removeItem("customer_id");
  sessionStorage.removeItem("rep_id");
}

export default api;
