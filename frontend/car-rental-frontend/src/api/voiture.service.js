// src/api/voiture.service.js - VERSION COMPLÈTE
import api from "./axios";

export const getAvailableVoitures = () =>
    api.get("/voitures/available");

export const getAllVoitures = () =>
    api.get("/voitures/all");

export const getVoitureById = (id) =>
    api.get(`/voitures/${id}`);  // ⚠️ Fonctionnera SEULEMENT après avoir ajouté l'endpoint backend

export const addVoiture = (data) =>
    api.post("/voitures/add", data);

export const updateVoiture = (data) =>
    api.put("/voitures/update", data);

export const deleteVoiture = (id) =>
    api.delete(`/voitures/delete/${id}`);

export const updateStatutVoiture = (id, statut) =>
    api.put(`/voitures/${id}/statut?statut=${statut}`);

export const searchVoitures = (searchTerm) =>
    api.get(`/voitures/search?search=${searchTerm}`);