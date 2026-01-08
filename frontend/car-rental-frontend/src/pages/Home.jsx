import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            PremiumCar
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

<div className="d-flex align-items-center ms-auto" id="mainNavbar">
  <Link to="/login" className="btn btn-outline-primary me-2">
    Se connecter
  </Link>

  <Link to="/register" className="btn btn-primary">
    Créer un compte
  </Link>
</div>


        </div>
      </nav>

      {/* ===== HERO / CONTENT ===== */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold mb-3">
              Location de voitures <span className="text-primary">simple & rapide</span>
            </h1>
            <p className="text-muted fs-5">
              Découvrez nos voitures disponibles, réservez en quelques clics
              et payez en toute sécurité.
            </p>

            <div className="d-flex gap-3 mt-4">
              <Link to="/login" className="btn btn-primary btn-lg">
                Voir les voitures Disponibles
              </Link>
              <Link to="/register" className="btn btn-outline-secondary btn-lg">
                Commencer
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <Footer/>
    </>
  );
}
