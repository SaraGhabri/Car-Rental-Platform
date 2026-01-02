// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../api/auth.service";

// Importer Bootstrap CSS (si pas déjà fait)
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faEnvelope,
    faPhone,
    faLock,
    faEye,
    faEyeSlash,
    faUserPlus,
    faCar,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validation côté client
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        if (formData.password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        setLoading(true);

        try {
            // Enlever confirmPassword avant l'envoi
            const { confirmPassword, ...dataToSend } = formData;

            await authService.register(dataToSend);

            setSuccess("Compte créé avec succès ! Redirection vers la page de connexion...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            console.error("Erreur d'inscription:", err);
            setError(err.response?.data?.message || "Erreur lors de la création du compte");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        {/* Carte d'inscription */}
                        <div className="card shadow-lg border-0">
                            {/* En-tête */}
                            <div className="card-header bg-success text-white text-center py-4">
                                <div className="d-flex align-items-center justify-content-center mb-3">
                                    <FontAwesomeIcon icon={faCar} className="h2 me-3" />
                                    <h1 className="h3 mb-0 fw-bold">Créer un compte</h1>
                                </div>
                                <p className="mb-0 opacity-75">
                                    Rejoignez notre plateforme de location premium
                                </p>
                            </div>

                            <div className="card-body p-4 p-md-5">
                                {/* Messages */}
                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                                            <use xlinkHref="#exclamation-triangle-fill"/>
                                        </svg>
                                        <div>{error}</div>
                                    </div>
                                )}

                                {success && (
                                    <div className="alert alert-success d-flex align-items-center" role="alert">
                                        <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                                        <div>{success}</div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {/* Nom d'utilisateur */}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label fw-semibold">
                                            <FontAwesomeIcon icon={faUser} className="me-2 text-success" />
                                            Nom d'utilisateur *
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FontAwesomeIcon icon={faUser} className="text-muted" />
                                            </span>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                className="form-control"
                                                placeholder="Choisissez un nom d'utilisateur"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="form-text">Minimum 3 caractères</div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-semibold">
                                            <FontAwesomeIcon icon={faEnvelope} className="me-2 text-success" />
                                            Adresse email *
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                                            </span>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="votre@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="form-text">Nous ne partagerons jamais votre email</div>
                                    </div>

                                    {/* Téléphone */}
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label fw-semibold">
                                            <FontAwesomeIcon icon={faPhone} className="me-2 text-success" />
                                            Numéro de téléphone
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">+216</span>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="form-control"
                                                placeholder="20 000 000"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="form-text">Optionnel - Pour les notifications SMS</div>
                                    </div>

                                    {/* Mot de passe */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-semibold">
                                            <FontAwesomeIcon icon={faLock} className="me-2 text-success" />
                                            Mot de passe *
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FontAwesomeIcon icon={faLock} className="text-muted" />
                                            </span>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Minimum 6 caractères"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={loading}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </button>
                                        </div>
                                        <div className="form-text">Au moins 6 caractères</div>
                                    </div>

                                    {/* Confirmation mot de passe */}
                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="form-label fw-semibold">
                                            <FontAwesomeIcon icon={faLock} className="me-2 text-success" />
                                            Confirmer le mot de passe *
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FontAwesomeIcon icon={faLock} className="text-muted" />
                                            </span>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className="form-control"
                                                placeholder="Répétez votre mot de passe"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                disabled={loading}
                                            >
                                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Checkbox conditions */}
                                    <div className="form-check mb-4">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="terms"
                                            required
                                        />
                                        <label className="form-check-label small" htmlFor="terms">
                                            J'accepte les{" "}
                                            <Link to="/terms" className="text-decoration-none">
                                                conditions générales
                                            </Link>{" "}
                                            et la{" "}
                                            <Link to="/privacy" className="text-decoration-none">
                                                politique de confidentialité
                                            </Link>
                                        </label>
                                    </div>

                                    {/* Boutons */}
                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-lg"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    Création en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                                    Créer mon compte
                                                </>
                                            )}
                                        </button>

                                        <Link
                                            to="/login"
                                            className="btn btn-outline-success btn-lg"
                                        >
                                            <FontAwesomeIcon icon={faUser} className="me-2" />
                                            J'ai déjà un compte
                                        </Link>
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="card-footer bg-light py-3">
                                <p className="text-center text-muted small mb-0">
                                    Déjà {new Date().getFullYear() - 2020}+ clients satisfaits
                                </p>
                            </div>
                        </div>

                        {/* Informations supplémentaires */}
                        <div className="mt-4">
                            <div className="row text-center">
                                <div className="col-md-4 mb-3">
                                    <div className="card border-0 bg-white shadow-sm">
                                        <div className="card-body">
                                            <FontAwesomeIcon icon={faCar} className="h3 text-success mb-2" />
                                            <h6 className="card-title">Large choix</h6>
                                            <p className="card-text small text-muted">50+ véhicules premium</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card border-0 bg-white shadow-sm">
                                        <div className="card-body">
                                            <i className="fas fa-shield-alt h3 text-success mb-2"></i>
                                            <h6 className="card-title">Sécurisé</h6>
                                            <p className="card-text small text-muted">Paiements 100% sécurisés</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card border-0 bg-white shadow-sm">
                                        <div className="card-body">
                                            <i className="fas fa-headset h3 text-success mb-2"></i>
                                            <h6 className="card-title">Support 24/7</h6>
                                            <p className="card-text small text-muted">Assistance permanente</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;