// src/api/auth.service.js
import api from "./axios";

export const login = async (data) => {
    console.log("📤 Appel API /login avec données:", data);

    try {
        const response = await api.post("/login", data, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("✅ Réponse API /login:");
        console.log("- Status:", response.status);
        console.log("- Data:", response.data);
        console.log("- Token présent:", !!response.data.token);
        console.log("- Structure complète:", JSON.stringify(response.data, null, 2));

        return response;
    } catch (error) {
        console.error("❌ Erreur API /login:", error.response?.data || error.message);
        throw error;
    }
};

export const register = (data) => api.post("/register", data);

export default {
    login,
    register,
};