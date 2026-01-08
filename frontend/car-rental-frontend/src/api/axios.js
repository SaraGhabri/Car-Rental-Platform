// src/api/axios.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081/api", // ← Déjà contient /api
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor pour ajouter le token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(`✅ Token ajouté à ${config.method?.toUpperCase()} ${config.url}`);
        } else {
            console.warn(`⚠️  Pas de token pour ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error) => {
        console.error("❌ Erreur interceptor:", error);
        return Promise.reject(error);
    }
);

// Interceptor réponse
api.interceptors.response.use(
    (response) => {
        console.log(`✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error(`❌ ${error.response?.status || "NO STATUS"} ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
        console.error("Erreur complète:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        });

        if (error.response?.status === 403) {
            console.error("🔐 Accès refusé (403). Vérifiez:");
            console.error("1. Le token est-il valide?");
            console.error("2. L'utilisateur a-t-il les droits?");
            console.error("3. L'URL est-elle correcte?");
        }

        return Promise.reject(error);
    }
);

export default api;