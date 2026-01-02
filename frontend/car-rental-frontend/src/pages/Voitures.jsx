/*import { useEffect, useState } from "react";
import { getAvailableVoitures } from "../api/voiture.service";
import VoitureCard from "../components/voiture/VoitureCard";


export default function Voitures() {
    const [voitures, setVoitures] = useState([]);

    useEffect(() => {
        getAvailableVoitures()
            .then(res => setVoitures(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {voitures.map(v => (
                <VoitureCard
                    key={v.idVoiture}
                    voiture={v}
                    userId={1} // temporaire
                />
            ))}
        </div>
    );
}
*/
// src/pages/Voitures.jsx
import { useEffect, useState } from "react";
import { getAvailableVoitures } from "../api/voiture.service";
import VoitureCard from "../components/voiture/VoitureCard";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

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
            console.error(err);
            setError("Erreur lors du chargement des véhicules");
        } finally {
            setLoading(false);
        }
    };

    const filteredVoitures = voitures.filter(v => {
        if (filter === "all") return true;
        return v.statut === filter;
    });

    return (
        <>
            <Navbar />

            <main className="flex-grow-1">
                <div className="container py-5">
                    {/* En-tête de page */}
                    <div className="row mb-5">
                        <div className="col">
                            <h1 className="display-5 fw-bold text-primary mb-3">
                                Nos véhicules disponibles
                            </h1>
                            <p className="lead text-muted">
                                Choisissez parmi notre sélection de véhicules premium
                            </p>
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
                                    Tous
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${filter === "DISPONIBLE" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setFilter("DISPONIBLE")}
                                >
                                    Disponibles
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${filter === "OCCUPE" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setFilter("OCCUPE")}
                                >
                                    Occupés
                                </button>
                            </div>
                        </div>
                        <div className="col-auto">
                            <span className="badge bg-info">
                                {filteredVoitures.length} véhicule{filteredVoitures.length > 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>

                    {/* Chargement */}
                    {loading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Chargement...</span>
                            </div>
                            <p className="mt-2">Chargement des véhicules...</p>
                        </div>
                    )}

                    {/* Erreur */}
                    {error && !loading && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {/* Grille des véhicules */}
                    {!loading && !error && (
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {filteredVoitures.length > 0 ? (
                                filteredVoitures.map(voiture => (
                                    <div key={voiture.idVoiture} className="col">
                                        <VoitureCard voiture={voiture} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="alert alert-warning text-center">
                                        Aucun véhicule disponible pour le moment
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Voitures;