// src/components/maintenance/MaintenanceForm.jsx
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSave,
    faTimes,
    faWrench,
    faCalendar,
    faCar,
    faDollarSign
} from '@fortawesome/free-solid-svg-icons';

const MaintenanceForm = ({ maintenance, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        type: '',
        dateDeb: '',
        dateFin: '',
        prix: 0,
        voiture: { idVoiture: '' },
        statut: 'PLANIFIEE'
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Initialiser avec les données d'édition
    useEffect(() => {
        if (maintenance) {
            setFormData({
                type: maintenance.type || '',
                dateDeb: maintenance.dateDeb || '',
                dateFin: maintenance.dateFin || '',
                prix: maintenance.prix || 0,
                voiture: { idVoiture: maintenance.voiture?.idVoiture || '' },
                statut: maintenance.statut || 'PLANIFIEE'
            });
        }
    }, [maintenance]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.type.trim()) {
            newErrors.type = 'Le type est requis';
        }

        if (!formData.dateDeb) {
            newErrors.dateDeb = 'La date de début est requise';
        }

        if (!formData.voiture.idVoiture) {
            newErrors.voitureId = 'Le véhicule est requis';
        }

        if (formData.prix < 0) {
            newErrors.prix = 'Le prix doit être positif';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Formater les dates pour l'API
            const dataToSend = {
                ...formData,
                prix: parseFloat(formData.prix)
            };

            await onSubmit(dataToSend);
        } catch (err) {
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                {/* Type de maintenance */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faWrench} className="me-2 text-primary" />
                        Type de maintenance *
                    </label>
                    <select
                        name="type"
                        className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez un type</option>
                        <option value="Entretien régulier">Entretien régulier</option>
                        <option value="Réparation">Réparation</option>
                        <option value="Vidange">Vidange</option>
                        <option value="Pneus">Pneus</option>
                        <option value="Freins">Freins</option>
                        <option value="Autre">Autre</option>
                    </select>
                    {errors.type && (
                        <div className="invalid-feedback">{errors.type}</div>
                    )}
                </div>

                {/* Statut */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        Statut *
                    </label>
                    <select
                        name="statut"
                        className="form-select"
                        value={formData.statut}
                        onChange={handleChange}
                        required
                    >
                        <option value="PLANIFIEE">Planifiée</option>
                        <option value="EN_COURS">En cours</option>
                        <option value="TERMINEE">Terminée</option>
                    </select>
                </div>

                {/* Date de début */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faCalendar} className="me-2 text-primary" />
                        Date de début *
                    </label>
                    <input
                        type="date"
                        name="dateDeb"
                        className={`form-control ${errors.dateDeb ? 'is-invalid' : ''}`}
                        value={formData.dateDeb}
                        onChange={handleChange}
                        required
                    />
                    {errors.dateDeb && (
                        <div className="invalid-feedback">{errors.dateDeb}</div>
                    )}
                </div>

                {/* Date de fin (optionnel) */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faCalendar} className="me-2 text-primary" />
                        Date de fin (optionnel)
                    </label>
                    <input
                        type="date"
                        name="dateFin"
                        className="form-control"
                        value={formData.dateFin}
                        onChange={handleChange}
                        min={formData.dateDeb}
                    />
                </div>

                {/* ID Véhicule */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faCar} className="me-2 text-primary" />
                        ID Véhicule *
                    </label>
                    <input
                        type="number"
                        name="voitureId"
                        className={`form-control ${errors.voitureId ? 'is-invalid' : ''}`}
                        value={formData.voiture.idVoiture}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            voiture: { idVoiture: e.target.value }
                        }))}
                        placeholder="Entrez l'ID du véhicule"
                        required
                    />
                    {errors.voitureId && (
                        <div className="invalid-feedback">{errors.voitureId}</div>
                    )}
                    <div className="form-text">
                        Entrez l'identifiant unique du véhicule
                    </div>
                </div>

                {/* Prix */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <FontAwesomeIcon icon={faDollarSign} className="me-2 text-primary" />
                        Coût (TND)
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">TND</span>
                        <input
                            type="number"
                            name="prix"
                            className={`form-control ${errors.prix ? 'is-invalid' : ''}`}
                            value={formData.prix}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                        />
                    </div>
                    {errors.prix && (
                        <div className="invalid-feedback">{errors.prix}</div>
                    )}
                </div>

                {/* Description (optionnel) */}
                <div className="col-12 mb-4">
                    <label className="form-label fw-semibold">
                        Notes additionnelles (optionnel)
                    </label>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Détails supplémentaires sur la maintenance..."
                    ></textarea>
                </div>
            </div>

            {/* Boutons */}
            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    <FontAwesomeIcon icon={faTimes} className="me-2" />
                    Annuler
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Enregistrement...
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faSave} className="me-2" />
                            {maintenance ? 'Mettre à jour' : 'Créer la maintenance'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default MaintenanceForm;