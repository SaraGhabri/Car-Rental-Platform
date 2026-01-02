// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import api from "./api/axios";

export default function App() {
    useEffect(() => {
        // Test de connexion
        api.get("/voitures/available")
            .then(res => console.log("Backend accessible:", res.data))
            .catch(err => console.error("Erreur backend:", err));
    }, []);

    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}