// src/api/reservation.service.js
import api from "./axios";

export const createReservation = (reservationData) => {
    // Essayez ces endpoints l'un après l'autre
    const endpoints = [
        "/api/reservations/create",  // Essai 1
        "/api/reservations/api/reservations/create",  // Essai 2 (basé sur votre screenshot)
        "/reservations/create",  // Essai 3
        "/create"  // Essai 4
    ];

    // Test automatique ou choisir manuellement
    return api.post("/api/reservations/api/reservations/create", reservationData);
};

// Alternative : fonction de test
export const testEndpoints = async () => {
    const testData = { test: true };
    const endpoints = [
        "/api/reservations/create",
        "/api/reservations/api/reservations/create",
        "/reservations/create"
    ];

    for (const endpoint of endpoints) {
        try {
            const res = await api.post(endpoint, testData);
            console.log(`✅ ${endpoint} :`, res.status);
            return endpoint;
        } catch (err) {
            console.log(`❌ ${endpoint} :`, err.response?.status);
        }
    }
    return null;
};