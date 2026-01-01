import api from "./axios";

export const createPaiement = (reservationId) =>
    api.post(`/paiements/reservation/${reservationId}`);

export const confirmPaiement = (id) =>
    api.put(`/paiements/${id}/confirm`);

export const failPaiement = (id) =>
    api.put(`/paiements/${id}/fail`);
