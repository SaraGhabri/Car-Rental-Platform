// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Voitures from "../pages/Voitures";
import VoitureDetails from "../pages/VoitureDetails";
import MesReservations from "../pages/MesReservations";
import MaintenanceAdmin from "../pages/admin/MaintenanceAdmin";

// Layout
import MainLayout from "../components/common/MainLayout";

// PrivateRoute Component
const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && (!user || user.role !== 'ROLE_ADMIN')) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default function AppRoutes() {
    return (
        <Routes>
            {/* Routes publiques avec layout */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/voitures" element={<MainLayout><Voitures /></MainLayout>} />
            <Route path="/voitures/:id" element={<MainLayout><VoitureDetails /></MainLayout>} />

            {/* Routes sans layout (fullscreen) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes protégées utilisateur */}
            <Route
                path="/mes-reservations"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <MesReservations />
                        </MainLayout>
                    </PrivateRoute>
                }
            />

            {/* Routes admin protégées */}
            <Route
                path="/admin/maintenances"
                element={
                    <PrivateRoute requireAdmin>
                        <MainLayout>
                            <MaintenanceAdmin />
                        </MainLayout>
                    </PrivateRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}