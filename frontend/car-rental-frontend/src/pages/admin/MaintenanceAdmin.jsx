// src/pages/admin/MaintenanceAdmin.jsx
import { useState, useEffect } from 'react';
import * as maintenanceService from '../../api/maintenance.service';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

const MaintenanceAdmin = () => {
    const { user } = useAuth();
    const [maintenances, setMaintenances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Vérifier si admin
    if (!user || user.role !== 'ROLE_ADMIN') {
        return <Navigate to="/" replace />;
    }

    useEffect(() => {
        loadMaintenances();
    }, []);

    const loadMaintenances = async () => {
        try {
            setLoading(true);
            const response = await maintenanceService.getAllMaintenances();
            setMaintenances(response.data);
        } catch (err) {
            console.error('Erreur:', err);
            setError('Impossible de charger les maintenances');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin fa-2x text-primary" />
                    <p className="mt-3">Chargement des maintenances...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">
                    <FontAwesomeIcon icon={faWrench} className="me-2" />
                    Gestion des Maintenances
                </h1>
                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Nouvelle maintenance
                </button>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {maintenances.length === 0 ? (
                <div className="alert alert-info">
                    Aucune maintenance trouvée
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Statut</th>
                            <th>Véhicule</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {maintenances.map(maintenance => (
                            <tr key={maintenance.idMaintenance}>
                                <td>#{maintenance.idMaintenance}</td>
                                <td>{maintenance.type}</td>
                                <td>
                                        <span className={`badge ${
                                            maintenance.statut === 'TERMINEE' ? 'bg-success' :
                                                maintenance.statut === 'EN_COURS' ? 'bg-warning' :
                                                    'bg-secondary'
                                        }`}>
                                            {maintenance.statut}
                                        </span>
                                </td>
                                <td>
                                    {maintenance.voiture?.marque} {maintenance.voiture?.modele}
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-info me-2">
                                        Détails
                                    </button>
                                    <button className="btn btn-sm btn-danger">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MaintenanceAdmin;