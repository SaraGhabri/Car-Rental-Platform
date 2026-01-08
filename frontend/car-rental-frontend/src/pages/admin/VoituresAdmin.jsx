import { useEffect, useMemo, useState } from "react";
import {
  getAllVoitures,
  addVoiture,
  updateVoiture,
  deleteVoiture,
  updateStatutVoiture,
} from "../../api/voiture.service";
import { getAllCategories } from "../../api/categorie.service";
import AdminNavbar from "../admin/AdminNavbar";
import Footer from "../../components/common/Footer";

const STATUTS = ["DISPONIBLE", "RESERVEE", "INDISPONIBLE"];

export default function VoituresAdmin() {
  const [voitures, setVoitures] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");

  const [form, setForm] = useState({
    idVoiture: null,
    marque: "",
    modele: "",
    matricule: "",
    prixParJour: "",
    statut: "DISPONIBLE",
    categorieId: "",
  });

  const isEdit = useMemo(() => form.idVoiture !== null, [form.idVoiture]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [vRes, cRes] = await Promise.all([getAllVoitures(), getAllCategories()]);
      setVoitures(vRes.data || []);
      setCategories(cRes.data || []);
    } catch {
      setError("Impossible de charger les données (voitures / catégories).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setForm({
      idVoiture: null,
      marque: "",
      modele: "",
      matricule: "",
      prixParJour: "",
      statut: "DISPONIBLE",
      categorieId: "",
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
      if (!form.categorieId) {
        setError("Veuillez choisir une catégorie.");
        return;
      }

      const payload = {
        idVoiture: isEdit ? form.idVoiture : undefined,
        marque: form.marque,
        modele: form.modele,
        matricule: form.matricule,
        prixParJour: form.prixParJour === "" ? null : Number(form.prixParJour),
        statut: form.statut,
        categorie: { idCat: Number(form.categorieId) },
      };

      if (isEdit) await updateVoiture(payload);
      else await addVoiture(payload);

      await loadData();
      resetForm();
    } catch {
      setError(isEdit ? "Erreur lors de la mise à jour." : "Erreur lors de l’ajout.");
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (v) => {
    setForm({
      idVoiture: v.idVoiture ?? null,
      marque: v.marque ?? "",
      modele: v.modele ?? "",
      matricule: v.matricule ?? "",
      prixParJour: v.prixParJour ?? "",
      statut: v.statut ?? "DISPONIBLE",
      categorieId: v.categorie?.idCat ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (idVoiture) => {
    if (!window.confirm("Supprimer cette voiture ?")) return;
    setError("");
    try {
      await deleteVoiture(idVoiture);
      setVoitures((prev) => prev.filter((x) => x.idVoiture !== idVoiture));
    } catch {
      setError("Erreur lors de la suppression.");
    }
  };

  const onChangeStatut = async (idVoiture, statut) => {
    setError("");
    try {
      await updateStatutVoiture(idVoiture, statut);
      setVoitures((prev) =>
        prev.map((x) => (x.idVoiture === idVoiture ? { ...x, statut } : x))
      );
    } catch {
      setError("Erreur lors du changement de statut.");
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return voitures;
    return voitures.filter((v) => {
      const marque = (v.marque ?? "").toLowerCase();
      const modele = (v.modele ?? "").toLowerCase();
      const matricule = (v.matricule ?? "").toLowerCase();
      const cat = (v.categorie?.nom ?? "").toLowerCase();
      return (
        marque.includes(q) ||
        modele.includes(q) ||
        matricule.includes(q) ||
        cat.includes(q)
      );
    });
  }, [voitures, query]);

  return (
    <>
    <AdminNavbar />
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Gestion des voitures</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center justify-content-between">
          <span className="fw-semibold">{isEdit ? "Modifier voiture" : "Ajouter voiture"}</span>
          {isEdit && <span className="badge text-bg-warning">Mode édition</span>}
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Marque</label>
              <input
                className="form-control"
                name="marque"
                value={form.marque}
                onChange={onChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Modèle</label>
              <input
                className="form-control"
                name="modele"
                value={form.modele}
                onChange={onChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Matricule</label>
              <input
                className="form-control"
                name="matricule"
                value={form.matricule}
                onChange={onChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Prix / jour</label>
              <input
                className="form-control"
                name="prixParJour"
                value={form.prixParJour}
                onChange={onChange}
                type="number"
                min="0"
                step="0.01"
                required
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

            {/* ✅ Catégorie */}
            <div className="col-md-6">
              <label className="form-label">Catégorie</label>
              <select
                className="form-select"
                name="categorieId"
                value={form.categorieId}
                onChange={onChange}
                required
              >
                <option value="">-- Choisir --</option>
                {categories.map((c) => (
                  <option key={c.idCat} value={c.idCat}>
                    {c.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Ajouter"}
              </button>

              {isEdit && (
                <button className="btn btn-secondary" type="button" onClick={resetForm} disabled={saving}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* SEARCH */}
      <div className="input-group mb-3">
        <span className="input-group-text">Recherche</span>
        <input
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="marque, modèle, matricule, catégorie..."
        />
      </div>

      {/* LIST */}
      <div className="card">
        <div className="card-header fw-semibold">Liste des voitures</div>

        <div className="card-body p-0">
          {loading ? (
            <div className="p-3">Chargement...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 80 }}>ID</th>
                    <th>Marque</th>
                    <th>Modèle</th>
                    <th>Catégorie</th>
                    <th>Matricule</th>
                    <th style={{ width: 110 }}>Prix/j</th>
                    <th style={{ width: 180 }}>Statut</th>
                    <th style={{ width: 180 }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((v) => (
                    <tr key={v.idVoiture}>
                      <td className="fw-semibold">{v.idVoiture}</td>
                      <td>{v.marque}</td>
                      <td>{v.modele}</td>

                      {/* ✅ catégorie affichée */}
                      <td>{v.categorie?.nom ?? "-"}</td>

                      <td>{v.matricule}</td>
                      <td>{v.prixParJour}</td>

                      <td>
                        {v.statut}
                      </td>

                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(v)}>
                            Modifier
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(v.idVoiture)}
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
                        Aucune voiture trouvée.
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
