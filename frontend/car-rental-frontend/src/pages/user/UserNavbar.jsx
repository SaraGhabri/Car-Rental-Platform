import { NavLink } from "react-router-dom";

export default function UserNavbar() {
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-semibold text-primary" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Brand */}
        <NavLink className="navbar-brand fw-bold" to="/user/voitures">
          PremiumCar
        </NavLink>

        {/* Links */}
        <ul className="navbar-nav flex-row gap-3 align-items-center">
          <li className="nav-item">
            <NavLink to="/user/voitures" className={linkClass}>
              Voitures disponibles
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/user/reservations" className={linkClass}>
              Mes réservations
            </NavLink>
          </li>

        </ul>

        {/* Logout */}
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
