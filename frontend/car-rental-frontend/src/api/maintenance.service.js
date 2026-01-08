import api from "./axios";

// ✅ READ ALL (ADMIN)
export const getAllMaintenances = () => api.get("/maintenances");

// ✅ READ ONE (ADMIN)
export const getMaintenanceById = (id) => api.get(`/maintenances/${id}`);

// ✅ READ BY VOITURE (ADMIN)
export const getMaintenancesByVoiture = (voitureId) =>
  api.get(`/maintenances/voiture/${voitureId}`);

// ✅ CREATE (ADMIN)
export const createMaintenance = (data) => api.post("/maintenances", data);

// ✅ TERMINER (ADMIN)
export const terminerMaintenance = (id) => api.put(`/maintenances/${id}/terminer`);

// ✅ DELETE (ADMIN)
export const deleteMaintenance = (id) => api.delete(`/maintenances/${id}`);
