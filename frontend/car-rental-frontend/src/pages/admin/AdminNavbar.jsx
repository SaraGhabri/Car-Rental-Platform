import { NavLink } from "react-router-dom";

export default function AdminNavbar() {
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-semibold" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Brand */}
        <NavLink className="navbar-brand fw-bold" to="/admin/dashboard">
          PremiumCar Admin
        </NavLink>

        {/* Links */}
        <ul className="navbar-nav flex-row gap-3 align-items-center">
          <li className="nav-item">
            <NavLink to="/admin/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/admin/voitures" className={linkClass}>
              Voitures
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/admin/categories" className={linkClass}>
              Catégories
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/admin/maintenances" className={linkClass}>
              Maintenances
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/reservations" className={linkClass}>
              Réservations
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
