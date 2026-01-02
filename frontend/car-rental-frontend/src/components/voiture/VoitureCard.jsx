// src/components/voiture/VoitureCard.jsx
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCar,
    faGasPump,
    faCogs,
    faUsers,
    faCalendarAlt,
    faInfoCircle,
    faTag,
    faRoad,
    faCalendarXmark,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import ReservationForm from "../reservation/ReservationForm";
import { useAuth } from "../../context/AuthContext";

const VoitureCard = ({ voiture }) => {
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const { isAuthenticated } = useAuth();

    const getStatusInfo = () => {
        switch(voiture.statut) {
            case 'DISPONIBLE':
                return { color: 'success', text: 'Disponible', icon: faCheckCircle };
            case 'OCCUPE':
                return { color: 'warning', text: 'Occupé', icon: faCalendarXmark };
            case 'RESERVEE':
                return { color: 'info', text: 'Réservée', icon: faCalendarAlt };
            case 'INDISPONIBLE':
                return { color: 'danger', text: 'Indisponible', icon: faCalendarXmark };
            default:
                return { color: 'secondary', text: voiture.statut, icon: faCar };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <>
            <div className="card h-100 shadow-sm border-0 hover-shadow transition-all">
                {/* En-tête avec statut */}
                <div className="card-header bg-white border-bottom-0 pb-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <span className={`badge bg-${statusInfo.color} px-3 py-2`}>
                            <FontAwesomeIcon icon={statusInfo.icon} className="me-1" />
                            {statusInfo.text}
                        </span>
                        <small className="text-muted">ID: #{voiture.idVoiture}</small>
                    </div>
                </div>

                {/* Image de la voiture */}
                <div className="position-relative">
                    <div className="ratio ratio-16x9">
                        <img
                            src={voiture.imageUrl || "/placeholder-car.jpg"}
                            className="card-img-top object-fit-cover"
                            alt={`${voiture.marque} ${voiture.modele}`}
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                            }}
                        />
                    </div>
                    <div className="position-absolute bottom-0 start-0 m-3">
                        <span className="badge bg-dark bg-opacity-75">
                            {voiture.categorie?.nom || 'Standard'}
                        </span>
                    </div>
                </div>

                <div className="card-body d-flex flex-column">
                    {/* Titre et modèle */}
                    <div className="mb-3">
                        <h5 className="card-title fw-bold text-dark mb-1">
                            {voiture.marque} {voiture.modele}
                        </h5>
                        <h6 className="card-subtitle text-muted">
                            {voiture.annee} • {voiture.couleur}
                        </h6>
                    </div>

                    {/* Caractéristiques */}
                    <div className="row g-2 mb-3">
                        <div className="col-6 d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2">
                                <FontAwesomeIcon icon={faGasPump} className="text-primary" />
                            </div>
                            <div>
                                <small className="text-muted d-block">Carburant</small>
                                <small className="fw-semibold">{voiture.carburant || 'Essence'}</small>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2">
                                <FontAwesomeIcon icon={faCogs} className="text-primary" />
                            </div>
                            <div>
                                <small className="text-muted d-block">Boîte</small>
                                <small className="fw-semibold">{voiture.boite || 'Automatique'}</small>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2">
                                <FontAwesomeIcon icon={faUsers} className="text-primary" />
                            </div>
                            <div>
                                <small className="text-muted d-block">Places</small>
                                <small className="fw-semibold">{voiture.places || 5} pers.</small>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2">
                                <FontAwesomeIcon icon={faRoad} className="text-primary" />
                            </div>
                            <div>
                                <small className="text-muted d-block">Kilométrage</small>
                                <small className="fw-semibold">{voiture.kilometrage?.toLocaleString() || '0'} km</small>
                            </div>
                        </div>
                    </div>

                    {/* Prix et actions */}
                    <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <div className="d-flex align-items-baseline">
                                    <h4 className="text-success fw-bold mb-0 me-2">
                                        {voiture.prixParJour?.toFixed(2) || '0.00'} TND
                                    </h4>
                                    <small className="text-muted">/ jour</small>
                                </div>
                                <small className="text-muted">
                                    Assurance incluse
                                </small>
                            </div>

                            <button
                                className={`btn ${voiture.statut === 'DISPONIBLE' && isAuthenticated() ? 'btn-primary' : 'btn-secondary'} px-4`}
                                onClick={() => {
                                    if (!isAuthenticated()) {
                                        alert("Veuillez vous connecter pour réserver");
                                        return;
                                    }
                                    if (voiture.statut !== 'DISPONIBLE') {
                                        alert(`Ce véhicule n'est pas disponible (Statut: ${statusInfo.text})`);
                                        return;
                                    }
                                    setShowForm(true);
                                }}
                                disabled={voiture.statut !== 'DISPONIBLE' || !isAuthenticated()}
                            >
                                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                {voiture.statut === 'DISPONIBLE' ? 'Réserver' : 'Indisponible'}
                            </button>
                        </div>

                        {/* Boutons secondaires */}
                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setShowDetails(!showDetails)}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
                                {showDetails ? 'Masquer détails' : 'Voir détails'}
                            </button>
                        </div>

                        {/* Détails supplémentaires */}
                        {showDetails && (
                            <div className="mt-3 pt-3 border-top">
                                <small className="text-muted d-block mb-2">Description:</small>
                                <p className="small mb-3">
                                    {voiture.description || 'Véhicule confortable et bien entretenu. Idéal pour vos déplacements professionnels ou personnels.'}
                                </p>
                                <div className="row small text-muted">
                                    <div className="col-6">Puissance: {voiture.puissance || 'N/A'} CV</div>
                                    <div className="col-6">Climatisation: Oui</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de réservation */}
            {showForm && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                    Réserver {voiture.marque} {voiture.modele}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
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