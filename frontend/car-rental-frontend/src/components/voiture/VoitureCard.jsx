/*import { useState } from "react";
import ReservationForm from "../reservation/ReservationForm";

const VoitureCard = ({ voiture }) => {  // ← Enlevez userId
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="border p-4 rounded shadow-md bg-white">
            <h3 className="font-bold">{voiture.marque} {voiture.modele}</h3>
            <p>{voiture.prixParJour} TND / jour</p>
            <p>Statut: {voiture.statut}</p>
            <button
                onClick={() => {
                    console.log("CLICK RESERVER", voiture.idVoiture);
                    setShowForm(true);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
            >
                Réserver
            </button>

            {showForm && (
                <ReservationForm
                    voiture={voiture}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default VoitureCard;*/
// src/components/voiture/VoitureCard.jsx
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCar,
    faGasPump,
    faCogs,
    faUsers,
    faCalendarAlt,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import ReservationForm from "../reservation/ReservationForm";

const VoitureCard = ({ voiture }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className="card h-100 shadow-sm border-0">
                {/* Image de la voiture */}
                <div className="position-relative">
                    <img
                        src={voiture.imageUrl || "https://via.placeholder.com/300x200/007bff/ffffff?text=Voiture"}
                        className="card-img-top"
                        alt={`${voiture.marque} ${voiture.modele}`}
                        style={{ height: "200px", objectFit: "cover" }}
                    />
                    <span className={`position-absolute top-0 end-0 m-2 badge ${voiture.statut === 'DISPONIBLE' ? 'bg-success' : 'bg-danger'}`}>
                        {voiture.statut}
                    </span>
                </div>

                <div className="card-body d-flex flex-column">
                    {/* En-tête */}
                    <div className="mb-3">
                        <h5 className="card-title fw-bold text-primary">
                            {voiture.marque} {voiture.modele}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {voiture.annee} • {voiture.couleur}
                        </h6>
                    </div>

                    {/* Caractéristiques */}
                    <div className="row row-cols-2 g-2 mb-3">
                        <div className="col d-flex align-items-center">
                            <FontAwesomeIcon icon={faGasPump} className="text-muted me-2" />
                            <small>{voiture.carburant || 'Essence'}</small>
                        </div>
                        <div className="col d-flex align-items-center">
                            <FontAwesomeIcon icon={faCogs} className="text-muted me-2" />
                            <small>{voiture.boite || 'Automatique'}</small>
                        </div>
                        <div className="col d-flex align-items-center">
                            <FontAwesomeIcon icon={faUsers} className="text-muted me-2" />
                            <small>{voiture.places || 5} places</small>
                        </div>
                        <div className="col d-flex align-items-center">
                            <FontAwesomeIcon icon={faCar} className="text-muted me-2" />
                            <small>{voiture.kilometrage || '0'} km</small>
                        </div>
                    </div>

                    {/* Prix */}
                    <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h4 className="text-success fw-bold mb-0">
                                    {voiture.prixParJour} TND
                                </h4>
                                <small className="text-muted">/ jour</small>
                            </div>
                            <button
                                className="btn btn-primary d-flex align-items-center"
                                onClick={() => setShowForm(true)}
                                disabled={voiture.statut !== 'DISPONIBLE'}
                            >
                                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                Réserver
                            </button>
                        </div>

                        {/* Bouton détails */}
                        <button
                            className="btn btn-outline-secondary btn-sm w-100"
                            onClick={() => console.log("Voir détails", voiture.idVoiture)}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
                            Plus de détails
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de réservation */}
            {showForm && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
                                ></button>
                            </div>
                            <div className="modal-body">
                                <ReservationForm
                                    voiture={voiture}
                                    onClose={() => setShowForm(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VoitureCard;