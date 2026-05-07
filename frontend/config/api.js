import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const todolistApi = {
  getAll: () => api.get("/todolist"),
  create: (text) => api.post("/todolist", { text }),
  update: (id, text, done) => api.put(`/todolist/${id}`, { text, done }),
  delete: (id) => api.delete(`/todolist/${id}`),
};