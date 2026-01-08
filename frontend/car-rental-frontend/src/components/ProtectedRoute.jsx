// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
    const { user, isAuthenticated } = useAuth();

    // Si non connecté
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Si rôles spécifiés mais utilisateur n'a pas le bon rôle
    if (roles && roles.length > 0) {
        if (!roles.includes(user?.role)) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;