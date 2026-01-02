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
import Paiement from "../pages/Paiement";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import VoituresAdmin from "../pages/admin/VoituresAdmin";
import ReservationsAdmin from "../pages/admin/ReservationsAdmin";
import CategoriesAdmin from "../pages/admin/CategoriesAdmin";
import MaintenancesAdmin from "../pages/admin/MaintenancesAdmin";
import PaiementsAdmin from "../pages/admin/PaiementsAdmin";

// PrivateRoute Component
const PrivateRoute = ({ children, role }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
};

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/voitures" element={<Voitures />} />
            <Route path="/voitures/:id" element={<VoitureDetails />} />

            {/* User Protected Routes */}
            <Route
                path="/mes-reservations"
                element={
                    <PrivateRoute>
                        <MesReservations />
                    </PrivateRoute>
                }
            />
            <Route
                path="/paiement/:id"
                element={
                    <PrivateRoute>
                        <Paiement />
                    </PrivateRoute>
                }
            />

            {/* Admin Protected Routes */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute role="ROLE_ADMIN">
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/voitures"
                element={
                    <PrivateRoute role="ROLE_ADMIN">
                        <VoituresAdmin />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/reservations"
                element={
                    <PrivateRoute role="ROLE_ADMIN">
                        <ReservationsAdmin />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/categories"
                element={
                    <PrivateRoute role="ROLE_ADMIN">
                        <CategoriesAdmin />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/maintenances"
                element={
                    <PrivateRoute role="ROLE_ADMIN">
                        <MaintenancesAdmin />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/paiements"
                element={
                    <PrivateRoute role="ROLE_ADMIN">
                        <PaiementsAdmin />
                    </PrivateRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}