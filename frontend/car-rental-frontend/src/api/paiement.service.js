// src/api/paiement.service.js
import api from "./axios";

// ================= USER / SYSTEM =================

// Créer ou récupérer paiement pour une réservation confirmée
export const createPaiement = (reservationId) =>
  api.post(`/paiements/reservation/${reservationId}`);

// Admin/User (selon ta sécurité) : confirmer / échouer
export const confirmPaiement = (paiementId) =>
  api.put(`/paiements/${paiementId}/confirm`);

export const failPaiement = (paiementId) =>
  api.put(`/paiements/${paiementId}/fail`);

// ================= ADMIN =================

// Récupérer tous les paiements
export const getAllPaiements = () =>
  api.get("/paiements");

// Récupérer un paiement par ID
export const getPaiementById = (id) =>
  api.get(`/paiements/${id}`);

// Supprimer un paiement
export const deletePaiement = (id) =>
  api.delete(`/paiements/${id}`);
