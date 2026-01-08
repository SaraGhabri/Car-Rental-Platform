// src/pages/user/VoituresDisponibles.jsx
import { useEffect, useMemo, useState } from "react";
import { getAvailableVoitures } from "../../api/voiture.service";
import VoitureCard from "../../components/voiture/VoitureCard";
import UserNavbar from "./UserNavbar";
import Footer from "../../components/common/Footer";

export default function VoituresDisponibles() {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");

  const loadVoitures = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAvailableVoitures(); // ✅ uniquement DISPONIBLE
      setVoitures(res.data || []);
    } catch (e) {
      setError("Impossible de charger les voitures disponibles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVoitures();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return voitures;

    return voitures.filter((v) => {
      const marque = (v.marque ?? "").toLowerCase();
      const modele = (v.modele ?? "").toLowerCase();
      const cat = (v.categorie?.nom ?? "").toLowerCase();
      return marque.includes(q) || modele.includes(q) || cat.includes(q);
    });
  }, [voitures, query]);

  return (
    <>
      <UserNavbar />

    <div className="container py-4">
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

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search */}
      <div className="input-group mb-4">
        <span className="input-group-text">Recherche</span>
        <input
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Marque, modèle, catégorie..."
        />
      </div>

      {loading ? (
        <div>Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="alert alert-info">Aucune voiture disponible.</div>
      ) : (
        <div className="row g-4">
          {filtered.map((v) => (
            <div className="col-12 col-sm-6 col-lg-4" key={v.idVoiture}>
              <VoitureCard voiture={v} />
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
