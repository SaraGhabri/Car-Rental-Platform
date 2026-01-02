// src/components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCar,
    faUser,
    faSignOutAlt,
    faCalendarAlt,
    faHome,
    faList
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
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
                        {user?.role === 'ROLE_ADMIN' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">
                                    <FontAwesomeIcon icon={faList} className="me-1" />
                                    Administration
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Partie droite */}
                    <div className="d-flex align-items-center">
                        {isAuthenticated ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <FontAwesomeIcon icon={faUser} className="me-2" />
                                    {user?.username}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/mon-compte">
                                            <FontAwesomeIcon icon={faUser} className="me-2" />
                                            Mon compte
                                        </Link>
                                    </li>
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
                                    Inscription
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;