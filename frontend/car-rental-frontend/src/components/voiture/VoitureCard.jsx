// src/components/voiture/VoitureCard.jsx
import { useState } from "react";
import ReservationForm from "../reservation/ReservationForm";

export default function VoitureCard({ voiture }) {
  const [showForm, setShowForm] = useState(false);

  const isDisponible = (voiture?.statut || "").toUpperCase() === "DISPONIBLE";

  return (
    <>
      <div className="card h-100 shadow-sm">

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title mb-1">
                {voiture.marque} {voiture.modele}
              </h5>
              <div className="text-muted small">
                Matricule: {voiture.matricule}
              </div>

              {voiture?.categorie?.nom && (
                <div className="text-muted small">
                  Catégorie: {voiture.categorie.nom}
                </div>
              )}
            </div>

            <span className={`badge ${isDisponible ? "bg-success" : "bg-secondary"}`}>
              {voiture.statut}
            </span>
          </div>

          <hr />

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-bold fs-5 text-primary">
                {voiture.prixParJour} DT
              </div>
              <div className="text-muted small">/ jour</div>
            </div>

            <button
              className="btn btn-primary"
              disabled={!isDisponible}
              onClick={() => setShowForm(true)}
            >
              Réserver
            </button>
          </div>
        </div>
      </div>

      {/* Modal Réservation */}
      {showForm && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Réserver {voiture.marque} {voiture.modele}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                />
              </div>

              <div className="modal-body">
                <ReservationForm voiture={voiture} onClose={() => setShowForm(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
