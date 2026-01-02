// src/api/reservation.service.js
import api from "./axios";

export const createReservation = (data) =>
    api.post("/reservations/create", data);  // Vérifiez que c'est bien "reservations" pluriel

export const getMyReservations = () =>
    api.get("/reservations/");

export const cancelReservation = (id) =>
    api.put(`/reservations/${id}/cancel`);