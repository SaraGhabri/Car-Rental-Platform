// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Pages (public)
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Pages (admin)
import Dashboard from "./pages/admin/Dashboard";
import VoituresAdmin from "./pages/admin/VoituresAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import MaintenancesAdmin from "./pages/admin/MaintenanceAdmin";
import PaiementsAdmin from "./pages/admin/PaiementsAdmin";
import ReservationsAdmin from "./pages/admin/ReservationsAdmin";

// Pages (user)
import VoitureList from "./pages/user/VoitureList";
import MesReservations from "./pages/user/MesReservations";
import PaiementPage from "./pages/user/PaiementPage";

// Protection
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ADMIN */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/voitures"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <VoituresAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <CategoriesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/maintenances"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <MaintenancesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <ReservationsAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/paiements"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <PaiementsAdmin />
              </ProtectedRoute>
            }
          />

          {/* USER */}
          <Route
            path="/user/voitures"
            element={
              <ProtectedRoute requiredRole="ROLE_USER">
                <VoitureList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/reservations"
            element={
              <ProtectedRoute requiredRole="ROLE_USER">
                <MesReservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paiement/:reservationId"
            element={
              <ProtectedRoute requiredRole="ROLE_USER">
                <PaiementPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
