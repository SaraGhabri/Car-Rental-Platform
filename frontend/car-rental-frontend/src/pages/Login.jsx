// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../api/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Importer Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faSignInAlt, faCar } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        console.log("🔐 Tentative de login avec:", username);

        try {
            const res = await authService.login({ username, password });
            const token = res.data.token;

            console.log("✅ Token reçu:", token.substring(0, 50) + "...");

            // Décodage pour debug
            const decoded = jwtDecode(token);
            console.log("🔍 Token décodé COMPLET:", decoded);

            // DEBUG: Affichez toutes les clés du token
            console.log("🔑 Clés dans le token:", Object.keys(decoded));
            console.log("🎭 decoded.roles:", decoded.roles);
            console.log("🎭 decoded.role:", decoded.role);
            console.log("🎭 decoded.authorities:", decoded.authorities);

            // EXTRACTION DU RÔLE - ESSAYEZ DIFFÉRENTES OPTIONS
            let role = "";

            if (decoded.roles && Array.isArray(decoded.roles) && decoded.roles.length > 0) {
                // Si le token contient déjà "ROLE_", gardez-le
                // Sinon, ajoutez-le
                const roleFromToken = decoded.roles[0];
                role = roleFromToken.startsWith("ROLE_") ? roleFromToken : "ROLE_" + roleFromToken.toUpperCase();
                console.log(`✅ Rôle extrait: ${decoded.roles[0]} -> ${role}`);
            }
            else if (decoded.role) {
                // Option 2: role = "ADMIN"
                role = "ROLE_" + decoded.role.toUpperCase();
                console.log(`✅ Rôle extrait depuis 'role': ${decoded.role} -> ${role}`);
            }
            else if (decoded.authorities && Array.isArray(decoded.authorities)) {
                // Option 3: authorities = ["ROLE_ADMIN"]
                role = decoded.authorities[0];
                console.log(`✅ Rôle extrait depuis 'authorities': ${role}`);
            }
            else {
                // Option 4: Par défaut
                role = "ROLE_USER";
                console.log(`⚠️  Rôle par défaut: ${role}`);
            }

            console.log("📦 Rôle final à stocker:", role);

            // STOCKAGE DANS LOCALSTORAGE
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            // VÉRIFICATION IMMÉDIATE
            console.log("💾 localStorage après stockage:");
            console.log("- token:", localStorage.getItem("token")?.substring(0, 30) + "...");
            console.log("- role:", localStorage.getItem("role"));
            console.log("- Tous les items:", { ...localStorage });

            // Mise à jour du contexte
            login(token, role);

            // Petit délai pour voir les logs
            setTimeout(() => {
                console.log("🔄 Redirection vers /voitures...");
                navigate("/voitures");
            }, 500);

        } catch (err) {
            console.error("❌ Erreur complète:", err);
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);

            setError(err.response?.data?.message || "Nom d'utilisateur ou mot de passe incorrect");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        {/* Carte de connexion */}
                        <div className="card shadow-lg border-0">
                            {/* En-tête avec image/icône */}
                            <div className="card-header bg-primary text-white text-center py-4">
                                <div className="d-flex align-items-center justify-content-center mb-3">
                                    <FontAwesomeIcon icon={faCar} className="h2 me-3" />
                                    <h1 className="h3 mb-0 fw-bold">Location Voitures Premium</h1>
                                </div>
                                <p className="mb-0 opacity-75">
                                    Connectez-vous pour gérer vos réservations
                                </p>
                            </div>

                            <div className="card-body p-4 p-md-5">
                                {/* Message d'erreur */}
                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <div className="flex-shrink-0 me-2">
                                            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                                                <use xlinkHref="#exclamation-triangle-fill"/>
                                            </svg>
                                        </div>
                                        <div>{error}</div>
                                    </div>
                                )}

                                <form onSubmit={handleLogin}>
                                    {/* Champ Nom d'utilisateur */}
                                    <div className="mb-4">
                                        <label htmlFor="username" className="form-label fw-semibold">
                                            <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                                            Nom d'utilisateur
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FontAwesomeIcon icon={faUser} className="text-muted" />
                                            </span>
                                            <input
                                                type="text"
                                                id="username"
                                                className="form-control form-control-lg"
                                                placeholder="Entrez votre nom d'utilisateur"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* Champ Mot de passe */}
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <label htmlFor="password" className="form-label fw-semibold">
                                                <FontAwesomeIcon icon={faLock} className="me-2 text-primary" />
                                                Mot de passe
                                            </label>
                                            <Link
                                                to="/forgot-password"
                                                className="text-decoration-none text-primary small"
                                            >
                                                Mot de passe oublié ?
                                            </Link>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FontAwesomeIcon icon={faLock} className="text-muted" />
                                            </span>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                className="form-control form-control-lg"
                                                placeholder="Entrez votre mot de passe"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bouton de connexion */}
                                    <div className="d-grid gap-2 mb-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Connexion en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                                                    Se connecter
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Séparateur */}
                                    <div className="position-relative my-4">
                                        <hr className="text-muted" />
                                        <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                                            <span className="text-muted small">Pas encore de compte ?</span>
                                        </div>
                                    </div>

                                    {/* Lien d'inscription */}
                                    <div className="d-grid gap-2">
                                        <Link
                                            to="/register"
                                            className="btn btn-outline-primary btn-lg"
                                        >
                                            Créer un nouveau compte
                                        </Link>
                                    </div>
                                </form>
                            </div>

                            {/* Footer de la carte */}
                            <div className="card-footer bg-light py-3">
                                <p className="text-center text-muted small mb-0">
                                    En vous connectant, vous acceptez nos{" "}
                                    <Link to="/terms" className="text-decoration-none">
                                        conditions d'utilisation
                                    </Link>{" "}
                                    et notre{" "}
                                    <Link to="/privacy" className="text-decoration-none">
                                        politique de confidentialité
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Lien support */}
                        <div className="text-center mt-4">
                            <p className="text-muted">
                                Besoin d'aide ?{" "}
                                <a href="mailto:support@locationvoitures.com" className="text-decoration-none">
                                    Contactez notre support
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;