// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Voitures from "./pages/Voitures";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute"; // ← Ajouté ici

// Layout
import MainLayout from "./components/common/MainLayout";

// API
import api from "./api/axios";

export default function App() {
    useEffect(() => {
        // Test de connexion
        api.get("/voitures/available")
            .then(res => console.log("✅ Backend accessible"))
            .catch(err => console.error("❌ Erreur backend:", err));
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Routes avec layout complet */}
                    <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                    <Route path="/voitures" element={<MainLayout><Voitures /></MainLayout>} />

                    {/* Routes sans layout (fullscreen) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Routes protégées */}
                    <Route
                        path="/mes-reservations"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <div className="container py-5">
                                        <h1>Mes réservations</h1>
                                        <p>Page en développement...</p>
                                    </div>
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}