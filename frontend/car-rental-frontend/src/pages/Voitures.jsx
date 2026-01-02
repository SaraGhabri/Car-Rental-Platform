// src/pages/Voitures.jsx
import { useEffect, useState } from "react";
import { getAvailableVoitures } from "../api/voiture.service";
import VoitureCard from "../components/voiture/VoitureCard";

const Voitures = () => {
    const [voitures, setVoitures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchVoitures();
    }, []);

    const fetchVoitures = async () => {
        try {
            setLoading(true);
            const res = await getAvailableVoitures();
            setVoitures(res.data);
        } catch (err) {
            console.error("Erreur chargement voitures:", err);
            setError("Erreur lors du chargement des véhicules");
        } finally {
            setLoading(false);
        }
    };

    // Filtrer selon le statut
    const filteredVoitures = voitures.filter(v => {
        if (filter === "all") return true;
        return v.statut === filter;
    });

    // Statistiques
    const stats = {
        total: voitures.length,
        disponible: voitures.filter(v => v.statut === 'DISPONIBLE').length,
        occupe: voitures.filter(v => v.statut === 'OCCUPE').length,
        reservee: voitures.filter(v => v.statut === 'RESERVEE').length,
        indisponible: voitures.filter(v => v.statut === 'INDISPONIBLE').length
    };

    return (
        <div className="container py-5">
            {/* En-tête de page */}
            <div className="row mb-5">
                <div className="col-md-8">
                    <h1 className="display-5 fw-bold text-primary mb-3">
                        Notre flotte de véhicules
                    </h1>
                    <p className="lead text-muted">
                        Choisissez parmi notre sélection de véhicules premium
                    </p>
                </div>
                <div className="col-md-4 text-md-end">
                    <button
                        className="btn btn-outline-primary"
                        onClick={fetchVoitures}
                        disabled={loading}
                    >
                        {loading ? 'Actualisation...' : 'Actualiser'}
                    </button>
                </div>
            </div>

            {/* Statistiques */}
            <div className="row mb-4">
                <div className="col">
                    <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-primary">Total: {stats.total}</span>
                        <span className="badge bg-success">Disponibles: {stats.disponible}</span>
                        <span className="badge bg-warning">Occupés: {stats.occupe}</span>
                        <span className="badge bg-info">Réservés: {stats.reservee}</span>
                        <span className="badge bg-danger">Indisponibles: {stats.indisponible}</span>
                    </div>
                </div>
            </div>

            {/* Filtres */}
            <div className="row mb-4">
                <div className="col">
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setFilter("all")}
                        >
                            Tous les véhicules
                        </button>
                        <button
                            type="button"
                            className={`btn ${filter === "DISPONIBLE" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setFilter("DISPONIBLE")}
                            disabled={stats.disponible === 0}
                        >
                            Disponibles ({stats.disponible})
                        </button>
                        <button
                            type="button"
                            className={`btn ${filter === "OCCUPE" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setFilter("OCCUPE")}
                            disabled={stats.occupe === 0}
                        >
                            Occupés ({stats.occupe})
                        </button>
                    </div>
                </div>
            </div>

            {/* Chargement */}
            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-3">Chargement des véhicules...</p>
                </div>
            )}

            {/* Erreur */}
            {error && !loading && (
                <div className="alert alert-danger">
                    <strong>Erreur:</strong> {error}
                    <button
                        className="btn btn-sm btn-outline-danger ms-3"
                        onClick={fetchVoitures}
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {/* Aucun véhicule */}
            {!loading && !error && filteredVoitures.length === 0 && (
                <div className="text-center py-5">
                    <div className="alert alert-warning">
                        <h5>Aucun véhicule trouvé</h5>
                        <p className="mb-0">
                            {filter === "all"
                                ? "Aucun véhicule n'est enregistré dans le système."
                                : `Aucun véhicule ${filter.toLowerCase()} pour le moment.`}
                        </p>
                    </div>
                </div>
            )}

            {/* Grille des véhicules */}
            {!loading && !error && filteredVoitures.length > 0 && (
                <>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="alert alert-info d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{filteredVoitures.length}</strong> véhicule{filteredVoitures.length > 1 ? 's' : ''} trouvé{filteredVoitures.length > 1 ? 's' : ''}
                                </div>
                                <small className="text-muted">
                                    {filter === "all" ? "Tous statuts" : `Statut: ${filter}`}
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {filteredVoitures.map(voiture => (
                            <div key={voiture.idVoiture} className="col">
                                <VoitureCard voiture={voiture} />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Aide */}
            <div className="row mt-5">
                <div className="col">
                    <div className="alert alert-light border">
                        <h6 className="fw-bold">💡 Comment réserver ?</h6>
                        <p className="mb-0 small">
                            1. Connectez-vous à votre compte<br/>
                            2. Cliquez sur "Réserver" sur un véhicule disponible<br/>
                            3. Sélectionnez vos dates de location<br/>
                            4. Confirmez la réservation
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Voitures;