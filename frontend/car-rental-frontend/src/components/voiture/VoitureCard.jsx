import { useState } from "react";
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

export default VoitureCard;