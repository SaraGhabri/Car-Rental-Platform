// src/pages/VoitureDetails.jsx - Version corrigée TEMPORAIRE
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAvailableVoitures } from "../api/voiture.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faCar,
    faGasPump,
    faCogs,
    faUsers,
    faRoad,
    faCalendarAlt,
    faTag,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

const VoitureDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [voiture, setVoiture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchVoiture();
    }, [id]);

    const fetchVoiture = async () => {
        try {
            setLoading(true);
            // TEMPORAIRE: Récupérez toutes les voitures disponibles
            const response = await getAvailableVoitures();
            const foundVoiture = response.data.find(v => v.idVoiture == id);

            if (foundVoiture) {
                setVoiture(foundVoiture);
            } else {
                setError("Véhicule non trouvé ou non disponible");
            }
        } catch (err) {
            console.error("Erreur:", err);
            setError("Erreur de chargement des données");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-3">Chargement du véhicule...</p>
                </div>
            </div>
        );
    }

    if (error || !voiture) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                    {error || "Véhicule non trouvé"}
                </div>
                <button className="btn btn-primary" onClick={() => navigate("/voitures")}>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Retour aux véhicules
                </button>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Bouton retour */}
            <div className="mb-4">
                <button className="btn btn-outline-primary" onClick={() => navigate("/voitures")}>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Retour aux véhicules
                </button>
            </div>

            <div className="row">
                {/* Image principale */}
                <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow">
                        <img
                            src={voiture.imageUrl || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                            className="card-img-top rounded"
                            alt={voiture.marque + " " + voiture.modele}
                            style={{ height: "400px", objectFit: "cover" }}
                        />
                    </div>
                </div>

                {/* Détails */}
                <div className="col-md-6">
                    <div className="card border-0 shadow h-100">
                        <div className="card-body">
                            {/* En-tête */}
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <span className="badge bg-primary mb-2">
                                        ID: #{voiture.idVoiture}
                                    </span>
                                    <h1 className="h2 fw-bold text-dark">
                                        {voiture.marque} {voiture.modele}
                                    </h1>
                                    <p className="text-muted mb-0">
                                        {voiture.annee} • {voiture.couleur}
                                    </p>
                                </div>
                                <span className={`badge ${voiture.statut === 'DISPONIBLE' ? 'bg-success' : 'bg-warning'} px-3 py-2`}>
                                    {voiture.statut}
                                </span>
                            </div>

                            {/* Prix */}
                            <div className="mb-4 p-3 bg-light rounded">
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faTag} className="text-primary fa-2x me-3" />
                                    <div>
                                        <h3 className="text-success fw-bold mb-0">
                                            {voiture.prixParJour?.toFixed(2) || '0.00'} TND
                                        </h3>
                                        <small className="text-muted">Prix par jour (TTC)</small>
                                    </div>
                                </div>
                            </div>

                            {/* Caractéristiques */}
                            <div className="row mb-4">
                                <div className="col-6 mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary text-white rounded-circle p-2 me-3">
                                            <FontAwesomeIcon icon={faGasPump} />
                                        </div>
                                        <div>
                                            <small className="text-muted d-block">Carburant</small>
                                            <span className="fw-semibold">{voiture.carburant || 'Essence'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary text-white rounded-circle p-2 me-3">
                                            <FontAwesomeIcon icon={faCogs} />
                                        </div>
                                        <div>
                                            <small className="text-muted d-block">Boîte</small>
                                            <span className="fw-semibold">{voiture.boite || 'Automatique'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary text-white rounded-circle p-2 me-3">
                                            <FontAwesomeIcon icon={faUsers} />
                                        </div>
                                        <div>
                                            <small className="text-muted d-block">Places</small>
                                            <span className="fw-semibold">{voiture.places || 5}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary text-white rounded-circle p-2 me-3">
                                            <FontAwesomeIcon icon={faRoad} />
                                        </div>
                                        <div>
                                            <small className="text-muted d-block">Kilométrage</small>
                                            <span className="fw-semibold">{voiture.kilometrage?.toLocaleString() || '0'} km</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Catégorie */}
                            {voiture.categorie && (
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-2">Catégorie</h6>
                                    <span className="badge bg-info">
                                        {voiture.categorie.nom}
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-2">Description</h6>
                                <p className="text-muted">
                                    {voiture.description || 'Véhicule premium avec toutes les options de confort et de sécurité.'}
                                </p>
                            </div>

                            {/* Bouton réservation */}
                            <div className="d-grid">
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => {
                                        if (voiture.statut === 'DISPONIBLE') {
                                            navigate(`/reservation/${voiture.idVoiture}`);
                                        } else {
                                            alert("Ce véhicule n'est pas disponible pour le moment.");
                                        }
                                    }}
                                    disabled={voiture.statut !== 'DISPONIBLE'}
                                >
                                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                    {voiture.statut === 'DISPONIBLE' ? 'Réserver ce véhicule' : 'Véhicule indisponible'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoitureDetails;