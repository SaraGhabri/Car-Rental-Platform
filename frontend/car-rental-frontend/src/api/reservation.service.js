// src/api/reservation.service.js
import api from "./axios";

export const createReservation = (reservationData) => {
    console.log("📤 Création réservation avec données:", reservationData);
    console.log("🔑 Token disponible:", localStorage.getItem("token")?.substring(0, 30) + "...");
    console.log("🌐 URL complète:", api.defaults.baseURL + "/reservations/create");

    // CORRECTION : "/reservations/create" au lieu de "/api/reservations/create"
    return api.post("/reservations/create", reservationData);
};

// Version avec debug amélioré
export const createReservationDebug = async (reservationData) => {
    const token = localStorage.getItem("token");

    console.log("=== DEBUG CRÉATION RÉSERVATION ===");
    console.log("Token:", token ? "✅ Présent" : "❌ Absent");
    console.log("Données:", reservationData);

    try {
        // Option 1: Utilisez l'instance axios
        const response = await api.post("/reservations/create", reservationData);
        console.log("✅ Réponse:", response.data);
        return response;

    } catch (error) {
        console.error("❌ Erreur détaillée:");
        console.error("- Status:", error.response?.status);
        console.error("- Message:", error.response?.data);
        console.error("- Headers:", error.config?.headers);

        // Testez directement avec fetch
        await testDirectFetch(reservationData, token);
        throw error;
    }
};

// Test avec fetch pour voir l'erreur exacte
const testDirectFetch = async (data, token) => {
    console.log("🔍 Test avec fetch direct...");

    try {
        const response = await fetch("http://localhost:8081/api/reservations/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        console.log("📊 Fetch - Status:", response.status);
        console.log("📊 Fetch - Status Text:", response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Fetch - Erreur:", errorText);
        } else {
            const result = await response.json();
            console.log("✅ Fetch - Succès:", result);
        }
    } catch (fetchError) {
        console.error("❌ Fetch - Exception:", fetchError);
    }
};