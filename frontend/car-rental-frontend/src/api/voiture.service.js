// src/api/voiture.service.js
import api from "./axios";

export const getAvailableVoitures = () =>
    api.get("/voitures/available");  // Devient /api/voitures/available automatiquement

export const getAllVoitures = () =>
    api.get("/voitures/all");

export const addVoiture = (data) =>
    api.post("/voitures/add", data);

export const updateVoiture = (data) =>
    api.put("/voitures/update", data);

export const deleteVoiture = (id) =>
    api.delete(`/voitures/delete/${id}`);

export const updateStatutVoiture = (id, statut) =>
    api.put(`/voitures/${id}/statut?statut=${statut}`);
