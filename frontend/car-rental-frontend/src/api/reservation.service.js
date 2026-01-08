import api from "./axios";

// ================= CREATE (CLIENT) =================
export const createReservation = (reservationData) =>
  api.post("/reservations/create", reservationData);

// ================= READ =================

// Client (ses propres réservations)
export const getMyReservations = () =>
  api.get("/reservations/client");

// Admin (toutes les réservations)
export const getAllReservationsAdmin = () =>
  api.get("/reservations/admin");

// Une réservation par ID
export const getReservationById = (id) =>
  api.get(`/reservations/${id}`);

// ================= ADMIN ACTIONS =================

// Confirmer
export const confirmReservation = (id) =>
  api.put(`/reservations/${id}/confirm`);

// Annuler
export const cancelReservation = (id) =>
  api.put(`/reservations/${id}/cancel`);

// Terminer
export const finishReservation = (id) =>
  api.put(`/reservations/${id}/finish`);

// Supprimer
export const deleteReservation = (id) =>
  api.delete(`/reservations/${id}`);
