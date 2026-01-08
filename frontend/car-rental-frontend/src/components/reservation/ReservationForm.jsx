
import { useState, useEffect } from "react";
import { createReservation } from "../../api/reservation.service";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDay,
    faCalendarCheck,
    faMoneyBillWave,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

const ReservationForm = ({ voiture, onClose }) => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [prix, setPrix] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [days, setDays] = useState(0);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setDays(diff > 0 ? diff : 0);
            setPrix(diff > 0 ? diff * voiture.prixParJour : 0);
        }
    }, [startDate, endDate, voiture]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // DEBUG AVANT ENVOI
        console.log("=== AVANT ENVOI RÉSERVATION ===");
        console.log("Token:", localStorage.getItem("token"));
        console.log("Données:", {
            startDate,
            endDate,
            voiture: { idVoiture: voiture.idVoiture }
        });

        try {
            const response = await createReservation({
                startDate,
                endDate,
                voiture: { idVoiture: voiture.idVoiture }
            });

            console.log("✅ Réservation créée:", response.data);
            alert("✅ Réservation créée avec succès !");
            onClose();

        } catch (err) {
            console.error("❌ Erreur création réservation:", err);
            setError(err.response?.data?.message || "Erreur lors de la réservation");
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {/* Informations véhicule */}
            <div className="alert alert-info">
                <strong>{voiture.marque} {voiture.modele}</strong> • {voiture.prixParJour} TND/jour
            </div>

            {/* Dates */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faCalendarDay} className="me-2 text-primary" />
                        Date de début *
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faCalendarCheck} className="me-2 text-primary" />
                        Date de fin *
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        min={startDate || new Date().toISOString().split('T')[0]}
                    />
                </div>
            </div>

            {/* Résumé */}
            {(days > 0 || prix > 0) && (
                <div className="card mb-3 border-success">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="text-muted">Durée</h6>
                                <h4 className="text-primary">{days} jour{days > 1 ? 's' : ''}</h4>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-muted">Prix total</h6>
                                <h4 className="text-success">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                                    {prix} TND
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Erreur */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Boutons */}
            <div className="d-flex gap-2">
                <button
                    type="button"
                    className="btn btn-outline-secondary flex-grow-1"
                    onClick={onClose}
                    disabled={loading}
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="btn btn-success flex-grow-1"
                    disabled={loading || prix <= 0}
                >
                    {loading ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="me-2 fa-spin" />
                            Traitement...
                        </>
                    ) : (
                        "Confirmer la réservation"
                    )}
                </button>
            </div>
        </form>
    );
};

export default ReservationForm;