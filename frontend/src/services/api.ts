import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const videoApi = {
  upload: async (formData: FormData) => {
    return api.post("/videos/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getById: async (id: string) => {
    return api.get(`/videos/${id}`);
  },
};

export const authApi = {
  registerUser: async (body: any) => {
    return api.post("/users/register", body);
  },
  loginUser: async (body: any) => {
    return api.post("/auth/login", body);
  },
};
