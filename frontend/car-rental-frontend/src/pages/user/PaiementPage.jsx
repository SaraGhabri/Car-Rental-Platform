// src/pages/user/PaiementPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReservationById } from "../../api/reservation.service";
import { createPaiement, confirmPaiement, failPaiement } from "../../api/paiement.service";
import UserNavbar from "./UserNavbar";
import Footer from "../../components/common/Footer";
export default function PaiementPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [paiement, setPaiement] = useState(null);

  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // 1) Charger la réservation (pour affichage)
      const rRes = await getReservationById(reservationId);
      setReservation(rRes.data);

      // 2) Créer ou récupérer le paiement (IMPORTANT)
      const pRes = await createPaiement(reservationId);
      setPaiement(pRes.data);
    } catch (e) {
      setError("Impossible de charger le paiement. Vérifie que la réservation est CONFIRMED et que tu es connecté.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservationId]);

  const onConfirm = async () => {
    if (!paiement?.idPaiement) {
      setError("Paiement introuvable (idPaiement manquant).");
      return;
    }
    setWorking(true);
    setError("");
    setSuccess("");
    try {
      const res = await confirmPaiement(paiement.idPaiement);
      setPaiement(res.data);
      setSuccess("Paiement confirmé ✅");
    } catch (e) {
      setError("Erreur lors de la confirmation du paiement (403 = token manquant ou endpoint protégé).");
    } finally {
      setWorking(false);
    }
  };

  const onFail = async () => {
    if (!paiement?.idPaiement) {
      setError("Paiement introuvable (idPaiement manquant).");
      return;
    }
    setWorking(true);
    setError("");
    setSuccess("");
    try {
      const res = await failPaiement(paiement.idPaiement);
      setPaiement(res.data);
      setSuccess("Paiement échoué ❌ (réservation annulée)");
    } catch (e) {
      setError("Erreur lors de l'échec du paiement (403 = token manquant ou endpoint protégé).");
    } finally {
      setWorking(false);
    }
  };

  if (loading) return <div className="container py-4">Chargement...</div>;

  if (!reservation || !paiement) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error || "Données introuvables."}</div>
        
      </div>
    );
  }

  const voiture = reservation.voiture
    ? `${reservation.voiture.marque} ${reservation.voiture.modele}`
    : "—";

  const paiementStatus = paiement.status ?? "EN_ATTENTE";

  return (
    <>
      <UserNavbar />
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Paiement</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate("/mes-reservations")}>
          Retour
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card mb-4">
        <div className="card-header fw-semibold">Récapitulatif</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <div className="text-muted small">Réservation</div>
              <div className="fw-semibold">#{reservation.idReservation}</div>
            </div>

            <div className="col-md-5">
              <div className="text-muted small">Voiture</div>
              <div className="fw-semibold">{voiture}</div>
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Total</div>
              <div className="fw-bold fs-4 text-primary">{reservation.prix} DT</div>
            </div>

            <div className="col-md-3">
              <div className="text-muted small">Début</div>
              <div className="fw-semibold">{reservation.startDate}</div>
            </div>

            <div className="col-md-3">
              <div className="text-muted small">Fin</div>
              <div className="fw-semibold">{reservation.endDate}</div>
            </div>

            <div className="col-md-6">
              <div className="text-muted small">Paiement</div>
              <div className="fw-semibold">
                ID #{paiement.idPaiement} — Statut:{" "}
                <span className="badge bg-info text-dark">{paiementStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header fw-semibold">Actions</div>
        <div className="card-body d-flex gap-2 flex-wrap">
          <button
            className="btn btn-success"
            onClick={onConfirm}
            disabled={working || paiementStatus === "PAYE"}
          >
            {working ? "..." : "Confirmer paiement"}
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={onFail}
            disabled={working || paiementStatus === "ECHEC"}
          >
            {working ? "..." : "Échouer paiement"}
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
