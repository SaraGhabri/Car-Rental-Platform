import { useEffect, useState } from "react";
import { getAllVoitures } from "../../api/voiture.service";
import { getAllCategories } from "../../api/categorie.service";
import { getAllMaintenances } from "../../api/maintenance.service";
import { getAllPaiements } from "../../api/paiement.service";
import AdminNavbar from "../admin/AdminNavbar";
import Footer from "../../components/common/Footer";

export default function Dashboard() {
  const [stats, setStats] = useState({
    voitures: 0,
    voituresReservees: 0,
    categories: 0,
    maintenances: 0,
    maintenancesEnCours: 0,
    totalPaiements: 0, 
  });

  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [vRes, cRes, mRes, pRes] = await Promise.all([
        getAllVoitures(),
        getAllCategories(),
        getAllMaintenances(),
        getAllPaiements(),
      ]);

      const voitures = vRes.data || [];
      const maintenances = mRes.data || [];
      const paiements = pRes.data || [];

      const totalPaiements = paiements
        .filter((p) => p.status === "PAYE")
        .reduce((sum, p) => sum + (p.montant || 0), 0);

      setStats({
        voitures: voitures.length,
        voituresReservees: voitures.filter(
          (v) => v.statut === "RESERVEE"
        ).length,
        categories: cRes.data?.length || 0,
        maintenances: maintenances.length,
        maintenancesEnCours: maintenances.filter(
          (m) => m.statut === "EN_COURS"
        ).length,
        totalPaiements,
      });
    } catch (e) {
      console.error("Erreur chargement dashboard", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="container py-4">Chargement du dashboard...</div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container py-4">
        <h2 className="mb-4">Dashboard Administrateur</h2>

        <div className="row g-4">
          {/* Voitures */}
          <div className="col-md-3">
            <div className="card text-bg-primary h-100">
              <div className="card-body">
                <h6 className="card-title">Voitures</h6>
                <h2 className="fw-bold">{stats.voitures}</h2>
              </div>
            </div>
          </div>

          {/* Voitures réservées */}
          <div className="col-md-3">
            <div className="card text-bg-danger h-100">
              <div className="card-body">
                <h6 className="card-title">Voitures réservées</h6>
                <h2 className="fw-bold">{stats.voituresReservees}</h2>
              </div>
            </div>
          </div>

          {/* Catégories */}
          <div className="col-md-3">
            <div className="card text-bg-secondary h-100">
              <div className="card-body">
                <h6 className="card-title">Catégories</h6>
                <h2 className="fw-bold">{stats.categories}</h2>
              </div>
            </div>
          </div>

          {/* Maintenances */}
          <div className="col-md-3">
            <div className="card text-bg-warning h-100">
              <div className="card-body">
                <h6 className="card-title">Maintenances</h6>
                <h2 className="fw-bold">{stats.maintenances}</h2>
              </div>
            </div>
          </div>

          {/* Maintenances en cours */}
          <div className="col-md-3">
            <div className="card text-bg-success h-100">
              <div className="card-body">
                <h6 className="card-title">Maintenances en cours</h6>
                <h2 className="fw-bold">{stats.maintenancesEnCours}</h2>
              </div>
            </div>
          </div>

          {/* 💰 Total paiements */}
          <div className="col-md-3">
            <div className="card text-bg-dark h-100">
              <div className="card-body">
                <h6 className="card-title">Total paiements</h6>
                <h2 className="fw-bold">
                  {stats.totalPaiements.toFixed(2)} DT
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
