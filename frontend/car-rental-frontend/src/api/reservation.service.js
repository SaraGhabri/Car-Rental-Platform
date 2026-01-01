import api from "./axios";

export const createReservation = (data) =>
    api.post("/reservations/create", data);
