import { useEffect, useMemo, useState } from "react";
import {
  getAllReservationsAdmin,
  confirmReservation,
  cancelReservation
} from "../../api/reservation.service";
import AdminNavbar from "./AdminNavbar";

import Footer from "../../components/common/Footer";


/* ===== Badge statut ===== */
const badgeForStatus = (status) => {
  switch (status) {
    case "PENDING":
      return <span className="badge bg-secondary">En attente</span>;
    case "CONFIRMED":
      return <span className="badge bg-success">Confirmée</span>;
    case "CANCELLED":
      return <span className="badge bg-danger">Annulée</span>;
    default:
      return <span className="badge bg-light text-dark">{status}</span>;
  }
};

export default function ReservationsAdmin() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const loadReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllReservationsAdmin();
      setReservations(res.data || []);
    } catch (e) {
      if (e?.response?.status === 403) {
        setError("Accès refusé : rôle ADMIN requis.");
      } else {
        setError("Impossible de charger les réservations.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const onConfirm = async (id) => {
    await confirmReservation(id);
    loadReservations();
  };

  const onCancel = async (id) => {
    await cancelReservation(id);
    loadReservations();
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return reservations;

    return reservations.filter((r) => {
      const client = (r.user?.username ?? "").toLowerCase();
      const voiture =
        `${r.voiture?.marque ?? ""} ${r.voiture?.modele ?? ""}`.toLowerCase();
      const statut = (r.status ?? "").toLowerCase();
      return client.includes(q) || voiture.includes(q) || statut.includes(q);
    });
  }, [reservations, query]);

  return (
    <>
      <AdminNavbar />

      <div className="container py-4">
        <h2 className="mb-3">Validation des réservations</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* SEARCH */}
        <div className="input-group mb-3">
          <span className="input-group-text">Recherche</span>
          <input
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="client / voiture / statut..."
          />
        </div>

        {/* TABLE */}
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Voiture</th>
                  <th>Date début</th>
                  <th>Date fin</th>
                  <th>Prix</th>
                  <th>Statut</th>
                  <th style={{ width: 220 }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((r) => (
                  <tr key={r.idReservation}>
                    <td className="fw-semibold">{r.idReservation}</td>
                    <td>{r.user?.username}</td>
                    <td>
                      {r.voiture?.marque} {r.voiture?.modele}
                      <div className="text-muted small">
                        {r.voiture?.matricule}
                      </div>
                    </td>
                    <td>{r.startDate}</td>
                    <td>{r.endDate}</td>
                    <td>{r.prix} DT</td>
                    <td>{badgeForStatus(r.status)}</td>

                    <td>
                      {r.status === "PENDING" ? (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => onConfirm(r.idReservation)}
                          >
                            Confirmer
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onCancel(r.idReservation)}
                          >
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center text-muted py-4">
                      Aucune réservation trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}
