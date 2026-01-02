/* / src/components/reservation/ReservationForm.jsx
import { useState, useEffect } from "react";
import { createReservation } from "../../api/reservation.service";
import { useAuth } from "../../context/AuthContext";

const ReservationForm = ({ voiture, onClose }) => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [prix, setPrix] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // DEBUG: Vérifiez le token au chargement
    useEffect(() => {
        console.log("👤 User dans ReservationForm:", user);
        console.log("🔑 Token direct:", localStorage.getItem("token"));
        console.log("🧾 Tout localStorage:", { ...localStorage });
    }, [user]);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setPrix(diff > 0 ? diff * voiture.prixParJour : 0);
        }
    }, [startDate, endDate, voiture]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // DEBUG avant l'envoi
        console.log("📤 Envoi réservation...");
        console.log("🔑 Token avant envoi:", localStorage.getItem("token"));
        console.log("📅 Dates:", { startDate, endDate });
        console.log("🚗 Voiture ID:", voiture.idVoiture);

        try {
            const response = await createReservation({
                startDate,
                endDate,
                voiture: { idVoiture: voiture.idVoiture }
            });

            console.log("✅ Réservation réussie:", response.data);
            alert("Réservation créée avec succès !");
            onClose();
        } catch (err) {
            console.error("❌ Erreur détaillée:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                headers: err.response?.headers
            });
            setError(err.response?.data?.message || "Erreur lors de la réservation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded bg-white shadow-md">
            <h2 className="text-xl font-bold mb-4">Réserver {voiture.marque} {voiture.modele}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block">Date de début :</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-1 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Date de fin :</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-1 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <p>Prix total : <strong>{prix} TND</strong></p>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading || prix <= 0}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Réservation..." : "Confirmer la réservation"}
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;*/

// src/components/reservation/ReservationForm.jsx
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