// src/api/axios.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081/api",
});

// Interceptor pour ajouter le token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("🔑 Token dans localStorage:", token);
        console.log("🌐 URL de la requête:", config.url);
        console.log("📤 Méthode:", config.method);

        if (token) {
            console.log("✅ Ajout du token aux headers");
            config.headers.Authorization = `Bearer ${token}`;
            console.log("📋 Headers après ajout:", config.headers);
        } else {
            console.log("❌ Aucun token trouvé dans localStorage");
            console.log("Tout localStorage:", localStorage);
        }

        return config;
    },
    (error) => {
        console.error("❌ Erreur interceptor request:", error);
        return Promise.reject(error);
    }
);

// Interceptor pour les réponses
api.interceptors.response.use(
    (response) => {
        console.log("✅ Réponse réussie:", response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error("❌ Erreur réponse:", {
            status: error.response?.status,
            url: error.config?.url,
            data: error.response?.data,
            headers: error.config?.headers
        });
        return Promise.reject(error);
    }
);

export default api;