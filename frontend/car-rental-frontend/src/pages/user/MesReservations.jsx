import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyReservations, cancelReservation } from "../../api/reservation.service";
import UserNavbar from "./UserNavbar";
import Footer from "../../components/common/Footer";

export default function MesReservations() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMyReservations();
      setReservations(res.data || []);
    } catch (e) {
      setError("Impossible de charger vos réservations. (Connexion requise)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCancel = async (id) => {
    if (!window.confirm("Annuler cette réservation ?")) return;

    setActionId(id);
    setError("");
    try {
      await cancelReservation(id);
      setReservations((prev) =>
        prev.map((r) =>
          (r.idReservation ?? r.id) === id ? { ...r, status: "CANCELLED" } : r
        )
      );
    } catch (e) {
      setError("Erreur lors de l'annulation.");
    } finally {
      setActionId(null);
    }
  };

  const onPay = (reservationId) => {
    // ✅ tu peux changer l’URL selon ton routing
    navigate(`/paiement/${reservationId}`);
  };

  const sorted = useMemo(() => {
    return [...reservations].sort(
      (a, b) => (b.idReservation ?? 0) - (a.idReservation ?? 0)
    );
  }, [reservations]);

  return (
    <>
      <UserNavbar />
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Mes réservations</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div>Chargement...</div>
      ) : sorted.length === 0 ? (
        <div className="alert alert-info">Vous n’avez aucune réservation.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Voiture</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Prix</th>
                <th>Statut</th>
                <th style={{ width: 180 }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((r) => {
                const id = r.idReservation ?? r.id;
                const voiture = r.voiture
                  ? `${r.voiture.marque} ${r.voiture.modele}`
                  : "—";

                const status = r.status;

                return (
                  <tr key={id}>
                    <td className="fw-semibold">{id}</td>
                    <td>{voiture}</td>
                    <td>{r.startDate}</td>
                    <td>{r.endDate}</td>
                    <td>{r.prix} DT</td>

                    <td>
                      {status === "PENDING" && (
                        <span className="badge bg-warning text-dark">
                          En attente
                        </span>
                      )}
                      {status === "CONFIRMED" && (
                        <span className="badge bg-success">Confirmée</span>
                      )}
                      {status === "CANCELLED" && (
                        <span className="badge bg-secondary">Annulée</span>
                      )}
                      {status === "COMPLETED" && (
                        <span className="badge bg-primary">Terminée</span>
                      )}
                      {status === "REJECTED" && (
                        <span className="badge bg-danger">Rejetée</span>
                      )}
                    </td>

                    {/* ✅ Action column */}
                    <td>
                      {status === "PENDING" && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          disabled={actionId === id}
                          onClick={() => onCancel(id)}
                        >
                          {actionId === id ? "Annulation..." : "Annuler"}
                        </button>
                      )}

                      {status === "CONFIRMED" && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => onPay(id)}
                        >
                          Payer
                        </button>
                      )}

                      {(status === "CANCELLED" ||
                        status === "COMPLETED" ||
                        status === "REJECTED") && (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
