// src/components/common/MainLayout.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // Icônes Navbar
    faCar,
    faUser,
    faSignOutAlt,
    faCalendarAlt,
    faHome,
    faList,
    faWrench,
    faUsers,
    faCog,
    faChartBar,
    // Icônes Footer
    faPhone,
    faEnvelope,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

// Import des icônes brand séparément
import {
    faFacebookF,
    faTwitter,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';

const MainLayout = ({ children }) => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Composant Navbar intégré
    const Navbar = () => (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <FontAwesomeIcon icon={faCar} className="h3 mb-0 me-2" />
                    <span className="fw-bold">PremiumCar</span>
                </Link>

                {/* Burger menu pour mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenu du menu */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <FontAwesomeIcon icon={faHome} className="me-1" />
                                Accueil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/voitures">
                                <FontAwesomeIcon icon={faCar} className="me-1" />
                                Nos véhicules
                            </Link>
                        </li>

                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/mes-reservations">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                    Mes réservations
                                </Link>
                            </li>
                        )}

                        {/* Menu Admin */}
                        {user?.role === 'ROLE_ADMIN' && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <FontAwesomeIcon icon={faCog} className="me-1" />
                                    Administration
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/admin/maintenances">
                                            <FontAwesomeIcon icon={faWrench} className="me-2" />
                                            Gestion des Maintenances
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/voitures">
                                            <FontAwesomeIcon icon={faCar} className="me-2" />
                                            Gestion des Véhicules
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/reservations">
                                            <FontAwesomeIcon icon={faList} className="me-2" />
                                            Toutes les Réservations
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/utilisateurs">
                                            <FontAwesomeIcon icon={faUsers} className="me-2" />
                                            Gestion des Utilisateurs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/statistiques">
                                            <FontAwesomeIcon icon={faChartBar} className="me-2" />
                                            Statistiques
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/parametres">
                                            <FontAwesomeIcon icon={faCog} className="me-2" />
                                            Paramètres
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Partie droite - Profil utilisateur */}
                    <div className="d-flex align-items-center">
                        {isAuthenticated ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <div className="d-flex flex-column align-items-start me-2">
                                        <span className="fw-semibold">{user?.username}</span>
                                        <small className="text-white-50">
                                            {user?.role === 'ROLE_ADMIN' ? 'Administrateur' : 'Client'}
                                        </small>
                                    </div>
                                    <FontAwesomeIcon icon={faUser} />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <h6 className="dropdown-header">
                                            Connecté en tant que
                                        </h6>
                                    </li>
                                    <li>
                                        <div className="dropdown-item-text">
                                            <small className="text-muted">Nom d'utilisateur:</small>
                                            <div className="fw-semibold">{user?.username}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown-item-text">
                                            <small className="text-muted">Rôle:</small>
                                            <div>
                                                <span className={`badge ${user?.role === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-success'}`}>
                                                    {user?.role === 'ROLE_ADMIN' ? 'Administrateur' : 'Client'}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" to="/mon-compte">
                                            <FontAwesomeIcon icon={faUser} className="me-2" />
                                            Mon compte
                                        </Link>
                                    </li>
                                    {user?.role === 'ROLE_ADMIN' && (
                                        <>
                                            <li>
                                                <Link className="dropdown-item" to="/admin/maintenances">
                                                    <FontAwesomeIcon icon={faWrench} className="me-2" />
                                                    Maintenances
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/admin">
                                                    <FontAwesomeIcon icon={faCog} className="me-2" />
                                                    Tableau de bord Admin
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={handleLogout}
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                            Déconnexion
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/login" className="btn btn-outline-light">
                                    Connexion
                                </Link>
                                <Link to="/register" className="btn btn-light">
                                    <FontAwesomeIcon icon={faUser} className="me-1" />
                                    Inscription
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );

    // Composant Footer intégré
    const Footer = () => (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Colonne 1: À propos */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold mb-3">
                            <span className="text-primary">Premium</span>Car
                        </h5>
                        <p className="text-light">
                            Votre partenaire de confiance pour la location de véhicules
                            premium en Tunisie. Qualité, sécurité et service premium.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#" className="text-white text-decoration-none">
                                <FontAwesomeIcon icon={faFacebookF} size="lg" />
                            </a>
                            <a href="#" className="text-white text-decoration-none">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="#" className="text-white text-decoration-none">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2: Liens rapides */}
                    <div className="col-md-2 mb-4">
                        <h5 className="fw-bold mb-3">Navigation</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-light text-decoration-none">
                                    Accueil
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/voitures" className="text-light text-decoration-none">
                                    Nos véhicules
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/tarifs" className="text-light text-decoration-none">
                                    Tarifs
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-light text-decoration-none">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3: Informations légales */}
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold mb-3">Informations</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/conditions" className="text-light text-decoration-none">
                                    Conditions générales
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/confidentialite" className="text-light text-decoration-none">
                                    Politique de confidentialité
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/faq" className="text-light text-decoration-none">
                                    FAQ
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/mentions-legales" className="text-light text-decoration-none">
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4: Contact */}
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold mb-3">Contact</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <FontAwesomeIcon icon={faPhone} className="me-2 text-primary" />
                                +216 70 000 000
                            </li>
                            <li className="mb-2">
                                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" />
                                contact@premiumcar.tn
                            </li>
                            <li className="mb-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
                                Tunis, Tunisie
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="border-light my-4" />

                {/* Copyright */}
                <div className="row">
                    <div className="col-md-6">
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} PremiumCar. Tous droits réservés.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0">
                            Conçu avec ❤️ en Tunisie
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;