// src/pages/MesReservations.jsx
import { useState, useEffect } from "react";
import api from "../api/axios";

const MesReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await api.get("/reservations/client");
            setReservations(response.data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Mes Réservations</h1>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            ) : reservations.length === 0 ? (
                <div className="alert alert-info">
                    Vous n'avez pas encore de réservation.
                </div>
            ) : (
                <div className="row">
                    {reservations.map((reservation) => (
                        <div key={reservation.idReservation} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Réservation #{reservation.idReservation}
                                    </h5>
                                    <div className="mb-2">
                                        <strong>Voiture:</strong> {reservation.voiture?.marque} {reservation.voiture?.modele}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Dates:</strong> {reservation.startDate} → {reservation.endDate}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Prix:</strong> {reservation.prix} TND
                                    </div>
                                    <div>
                                        <span className={`badge ${
                                            reservation.status === 'CONFIRMED' ? 'bg-success' :
                                                reservation.status === 'PENDING' ? 'bg-warning' :
                                                    reservation.status === 'CANCELLED' ? 'bg-danger' :
                                                        'bg-secondary'
                                        }`}>
                                            {reservation.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MesReservations;