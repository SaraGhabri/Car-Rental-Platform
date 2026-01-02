// src/components/reservation/ReservationForm.jsx
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

export default ReservationForm;