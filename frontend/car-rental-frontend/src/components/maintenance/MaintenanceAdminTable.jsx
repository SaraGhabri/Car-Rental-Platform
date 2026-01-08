// src/components/maintenance/MaintenanceAdminTable.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrash,
    faCheckCircle,
    faCar,
    faCalendar,
    faTag,
    faWrench
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const MaintenanceAdminTable = ({
                                   maintenances,
                                   onDelete,
                                   onTerminer,
                                   onEdit,
                                   loading
                               }) => {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette maintenance ?")) {
            onDelete(id);
        }
    };

    const getStatusBadge = (statut) => {
        switch(statut) {
            case 'PLANIFIEE':
                return <span className="badge bg-warning">Planifiée</span>;
            case 'EN_COURS':
                return <span className="badge bg-primary">En cours</span>;
            case 'TERMINEE':
                return <span className="badge bg-success">Terminée</span>;
            default:
                return <span className="badge bg-secondary">{statut}</span>;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (!maintenances || maintenances.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-info">
                    <FontAwesomeIcon icon={faWrench} className="h4 mb-3" />
                    <h5>Aucune maintenance trouvée</h5>
                    <p className="mb-0">Commencez par créer une nouvelle maintenance</p>
                </div>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead className="table-light">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Véhicule</th>
                    <th scope="col">Type</th>
                    <th scope="col">Dates</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Statut</th>
                    <th scope="col" className="text-end">Actions</th>
                </tr>
                </thead>
                <tbody>
                {maintenances.map((maintenance) => (
                    <tr key={maintenance.idMaintenance}>
                        <td>
                            <strong>#{maintenance.idMaintenance}</strong>
                        </td>
                        <td>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon
                                    icon={faCar}
                                    className="text-primary me-2"
                                />
                                <div>
                                    <div className="fw-semibold">
                                        {maintenance.voiture?.marque} {maintenance.voiture?.modele}
                                    </div>
                                    <small className="text-muted">
                                        ID: {maintenance.voiture?.idVoiture}
                                    </small>
                                </div>
                            </div>
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faWrench} className="me-2 text-info" />
                            {maintenance.type}
                        </td>
                        <td>
                            <div className="d-flex flex-column">
                                <small>
                                    <FontAwesomeIcon icon={faCalendar} className="me-1" />
                                    <strong>Début:</strong> {formatDate(maintenance.dateDeb)}
                                </small>
                                <small>
                                    <FontAwesomeIcon icon={faCalendar} className="me-1" />
                                    <strong>Fin:</strong> {formatDate(maintenance.dateFin) || 'En cours'}
                                </small>
                            </div>
                        </td>
                        <td>
                                <span className="badge bg-success fs-6">
                                    {maintenance.prix?.toFixed(2) || '0.00'} TND
                                </span>
                        </td>
                        <td>
                            {getStatusBadge(maintenance.statut)}
                        </td>
                        <td>
                            <div className="d-flex justify-content-end gap-2">
                                {maintenance.statut !== 'TERMINEE' && (
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => onTerminer(maintenance.idMaintenance)}
                                        title="Terminer la maintenance"
                                    >
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </button>
                                )}

                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => onEdit(maintenance)}
                                    title="Modifier"
                                    disabled={maintenance.statut === 'TERMINEE'}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(maintenance.idMaintenance)}
                                    title="Supprimer"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaintenanceAdminTable;