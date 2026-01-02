// src/api/maintenance.service.js
import api from "./axios";

// CORRECTION IMPORTANTE : pas de double /api
export const getAllMaintenances = () => {
    return api.get("/maintenances");  // ← /maintenances, pas /api/maintenances
};

export const getMaintenanceById = (id) => {
    return api.get(`/maintenances/${id}`);
};

export const createMaintenance = (maintenanceData) => {
    return api.post("/maintenances", maintenanceData);
};

export const terminerMaintenance = (id) => {
    return api.put(`/maintenances/${id}/terminer`);
};

export const deleteMaintenance = (id) => {
    return api.delete(`/maintenances/${id}`);
};