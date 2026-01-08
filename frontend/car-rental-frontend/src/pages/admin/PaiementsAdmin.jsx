import { useEffect, useState } from "react";
import { getAllPaiements, deletePaiement } from "../../api/paiement.service";
import AdminNavbar from "./AdminNavbar";
import Footer from "../../components/common/Footer";

export default function PaiementsAdmin() {
  const [paiements, setPaiements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPaiements = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllPaiements();
      setPaiements(res.data || []);
    } catch (e) {
      setError("Impossible de charger les paiements (ADMIN requis).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaiements();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Supprimer ce paiement ?")) return;

    try {
      await deletePaiement(id);
      setPaiements((prev) =>
        prev.filter((p) => p.idPaiement !== id)
      );
    } catch {
      setError("Erreur lors de la suppression du paiement.");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container py-4">
        <h2 className="mb-4">Liste des paiements</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th>Date paiement</th>
                  <th>Réservation</th>
                  <th style={{ width: 140 }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {paiements.map((p) => (
                  <tr key={p.idPaiement}>
                    <td className="fw-semibold">{p.idPaiement}</td>

                    <td>{p.montant} DT</td>

                    <td>
                      {p.status === "PAYE" && (
                        <span className="badge bg-success">Payé</span>
                      )}
                      {p.status === "EN_ATTENTE" && (
                        <span className="badge bg-warning text-dark">
                          En attente
                        </span>
                      )}
                      {p.status === "ECHEC" && (
                        <span className="badge bg-danger">Échec</span>
                      )}
                    </td>

                    <td>
                      {p.datePaiement
                        ? new Date(p.datePaiement).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      {p.reservation
                        ? `#${p.reservation.idReservation}`
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(p.idPaiement)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}

                {paiements.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      Aucun paiement trouvé.
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
