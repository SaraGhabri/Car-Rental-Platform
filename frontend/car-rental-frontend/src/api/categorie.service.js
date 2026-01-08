import api from "./axios";

// ✅ READ ALL (Backend: GET /api/categories/all)
export const getAllCategories = () => api.get("/categories/all");

// ✅ READ ONE (Backend: GET /api/categories/{id})
export const getCategorieById = (id) => api.get(`/categories/${id}`);

// ✅ CREATE (ADMIN) (Backend: POST /api/categories/create)
export const createCategorie = (data) => api.post("/categories/create", data);

// ✅ UPDATE (ADMIN) (Backend: PUT /api/categories/{id})
export const updateCategorie = (id, data) => api.put(`/categories/${id}`, data);

// ✅ DELETE (ADMIN) (Backend: DELETE /api/categories/{id})
export const deleteCategorie = (id) => api.delete(`/categories/${id}`);
