import { useEffect, useMemo, useState } from "react";
import {
  getAllMaintenances,
  createMaintenance,
  terminerMaintenance,
  deleteMaintenance,
  getMaintenancesByVoiture,
} from "../../api/maintenance.service";
import { getAvailableVoitures } from "../../api/voiture.service";
import AdminNavbar from "../admin/AdminNavbar";
import Footer from "../../components/common/Footer";

const STATUTS = ["PLANIFIEE", "EN_COURS", "TERMINEE"];

export default function MaintenancesAdmin() {
  const [maintenances, setMaintenances] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [voitureFilter, setVoitureFilter] = useState(""); // filtre optionnel

  const [form, setForm] = useState({
    voitureId: "",
    dateDeb: "",
    type: "VIDANGE",
    prix: "",
    statut: "PLANIFIEE",
  });

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [mRes, vRes] = await Promise.all([getAllMaintenances(), getAvailableVoitures()]);
      setMaintenances(mRes.data || []);
      setVoitures(vRes.data || []);
    } catch (e) {
      setError("Impossible de charger les données (maintenances / voitures).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const reloadMaintenances = async () => {
    setLoading(true);
    setError("");
    try {
      if (voitureFilter) {
        const res = await getMaintenancesByVoiture(Number(voitureFilter));
        setMaintenances(res.data || []);
      } else {
        const res = await getAllMaintenances();
        setMaintenances(res.data || []);
      }
    } catch {
      setError("Impossible de charger les maintenances.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      voitureId: "",
      dateDeb: "",
      type: "VIDANGE",
      prix: "",
      statut: "PLANIFIEE",
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (!form.voitureId) {
        setError("Veuillez choisir une voiture.");
        return;
      }

      const payload = {
        dateDeb: form.dateDeb, // YYYY-MM-DD (LocalDate)
        type: form.type,
        statut: form.statut,
        prix: form.prix === "" ? 0 : Number(form.prix),
        voiture: { idVoiture: Number(form.voitureId) },
      };

      await createMaintenance(payload);
      await reloadMaintenances();
      resetForm();
    } catch {
      setError("Erreur lors de la création de la maintenance.");
    } finally {
      setSaving(false);
    }
  };

  const onTerminer = async (idMaintenance) => {
    if (!idMaintenance) return;
    setError("");
    try {
      await terminerMaintenance(idMaintenance);
      setMaintenances((prev) =>
        prev.map((m) =>
          m.idMaintenance === idMaintenance ? { ...m, statut: "TERMINEE" } : m
        )
      );
    } catch {
      setError("Erreur lors de la clôture (vérifie que tu es connecté en ADMIN).");
    }
  };

  const onDelete = async (idMaintenance) => {
    if (!idMaintenance) return;
    if (!window.confirm("Supprimer cette maintenance ?")) return;

    setError("");
    try {
      await deleteMaintenance(idMaintenance);
      setMaintenances((prev) => prev.filter((m) => m.idMaintenance !== idMaintenance));
    } catch {
      setError("Erreur lors de la suppression (vérifie que tu es connecté en ADMIN).");
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return maintenances;

    return maintenances.filter((m) => {
      const type = (m.type ?? "").toLowerCase();
      const statut = (m.statut ?? "").toLowerCase();
      const mat = (m.voiture?.matricule ?? "").toLowerCase();
      return type.includes(q) || statut.includes(q) || mat.includes(q);
    });
  }, [maintenances, query]);

  const badgeForStatut = (statut) => {
    const s = (statut ?? "").toUpperCase();
    if (s === "TERMINEE") return <span className="badge bg-success">Terminée</span>;
    if (s === "EN_COURS") return <span className="badge bg-warning text-dark">En cours</span>;
    return <span className="badge bg-secondary">Planifiée</span>;
  };

  return (
    <>
      <AdminNavbar />
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Gestion des maintenances</h2>
       
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-header fw-semibold">Nouvelle maintenance</div>
        <div className="card-body">
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Voiture</label>
              <select
                className="form-select"
                name="voitureId"
                value={form.voitureId}
                onChange={onChange}
                required
              >
                <option value="">-- Choisir --</option>
                {voitures.map((v) => (
                  <option key={v.idVoiture} value={v.idVoiture}>
                    {v.marque} {v.modele} ({v.matricule})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Date début</label>
              <input
                type="date"
                className="form-control"
                name="dateDeb"
                value={form.dateDeb}
                onChange={onChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Type</label>
              <input
                className="form-control"
                name="type"
                value={form.type}
                onChange={onChange}
                placeholder="Ex: VIDANGE"
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Prix</label>
              <input
                className="form-control"
                name="prix"
                value={form.prix}
                onChange={onChange}
                type="number"
                min="0"
                step="0.01"
                placeholder="150"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Statut</label>
              <select className="form-select" name="statut" value={form.statut} onChange={onChange}>
                {STATUTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <button className="btn btn-primary" disabled={saving}>
                {saving ? "Enregistrement..." : "Créer maintenance"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FILTERS */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">Recherche</span>
            <input
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="type / statut / matricule..."
            />
          </div>
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={voitureFilter}
            onChange={(e) => setVoitureFilter(e.target.value)}
          >
            <option value="">Toutes les voitures</option>
            {voitures.map((v) => (
              <option key={v.idVoiture} value={v.idVoiture}>
                {v.marque} {v.modele} ({v.matricule})
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <button className="btn btn-outline-secondary" onClick={reloadMaintenances} disabled={loading}>
            Appliquer filtre
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="card">
        <div className="card-header fw-semibold">Liste des maintenances</div>
        <div className="card-body p-0">
          {loading ? (
            <div className="p-3">Chargement...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Voiture</th>
                    <th>Date début</th>
                    <th>Type</th>
                    <th>Prix</th>
                    <th>Statut</th>
                    <th style={{ width: 220 }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.idMaintenance}>
                      <td className="fw-semibold">{m.idMaintenance}</td>
                      <td>
                        {m.voiture?.marque} {m.voiture?.modele}{" "}
                        <span className="text-muted">({m.voiture?.matricule})</span>
                      </td>
                      <td>{m.dateDeb ?? "-"}</td>
                    
                      <td>{m.type ?? "-"}</td>
                      <td>{m.prix ?? "-"}</td>
                      <td>{badgeForStatut(m.statut)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          {String(m.statut).toUpperCase() !== "TERMINEE" && (
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => onTerminer(m.idMaintenance)}
                            >
                              Terminer
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(m.idMaintenance)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-4 text-muted">
                        Aucune maintenance trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
