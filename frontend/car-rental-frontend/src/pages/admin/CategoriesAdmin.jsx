import { useEffect, useMemo, useState } from "react";
import {
  getAllCategories,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from "../../api/categorie.service";
import AdminNavbar from "../admin/AdminNavbar";
import Footer from "../../components/common/Footer";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");

  // ✅ utiliser idCat
  const [form, setForm] = useState({
    idCat: null,
    nom: "",
    description: "",
  });

  const isEdit = useMemo(() => form.idCat !== null, [form.idCat]);

  const loadCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllCategories();
      setCategories(res.data || []);
    } catch {
      setError("Impossible de charger les catégories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setForm({ idCat: null, nom: "", description: "" });
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
      const payload = {
        nom: form.nom,
        description: form.description,
      };

      if (isEdit) {
        // ✅ PUT /categories/{id}
        await updateCategorie(form.idCat, payload);
      } else {
        // ✅ POST /categories/create
        await createCategorie(payload);
      }

      await loadCategories();
      resetForm();
    } catch {
      setError(isEdit ? "Erreur lors de la mise à jour." : "Erreur lors de l’ajout.");
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (c) => {
    setForm({
      idCat: c.idCat,
      nom: c.nom ?? "",
      description: c.description ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (idCat) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    setError("");
    try {
      await deleteCategorie(idCat);
      setCategories((prev) => prev.filter((c) => c.idCat !== idCat));
    } catch {
      setError("Erreur lors de la suppression.");
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => (c.nom ?? "").toLowerCase().includes(q));
  }, [categories, query]);

  return (
       <>
        <AdminNavbar />
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Gestion des catégories</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <span className="fw-semibold">
            {isEdit ? "Modifier catégorie" : "Ajouter catégorie"}
          </span>
          {isEdit && <span className="badge bg-warning text-dark">Édition</span>}
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nom</label>
              <input
                className="form-control"
                name="nom"
                value={form.nom}
                onChange={onChange}
                placeholder="Ex: SUV"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                className="form-control"
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Ex: Véhicules spacieux et confortables"
              />
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
          placeholder="Nom de la catégorie..."
        />
      </div>

      {/* LIST */}
      <div className="card">
        <div className="card-header fw-semibold">Liste des catégories</div>

        <div className="card-body p-0">
          {loading ? (
            <div className="p-3">Chargement...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 80 }}>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th style={{ width: 180 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.idCat}>
                      <td className="fw-semibold">{c.idCat}</td>
                      <td>{c.nom}</td>
                      <td className="text-muted">{c.description}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onEdit(c)}
                          >
                            Modifier
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(c.idCat)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-muted">
                        Aucune catégorie trouvée.
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
