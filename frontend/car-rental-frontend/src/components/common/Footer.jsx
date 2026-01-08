// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import correct des icônes solid
import {
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

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto mb-0">
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
};

export default Footer;