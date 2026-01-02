// src/pages/Home.jsx (pas admin/CategoriesAdmin.jsx !)
const Home = () => {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary mb-3">
                    Bienvenue chez <span className="text-dark">PremiumCar</span>
                </h1>
                <p className="lead text-muted">
                    Votre partenaire de confiance pour la location de véhicules premium
                </p>
            </div>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <div className="bg-primary text-white rounded-circle d-inline-flex p-3 mb-3">
                                <i className="fas fa-car fa-2x"></i>
                            </div>
                            <h5 className="card-title">Véhicules Premium</h5>
                            <p className="card-text">
                                Parcourez notre sélection exclusive de véhicules haut de gamme
                            </p>
                            <a href="/voitures" className="btn btn-outline-primary">
                                Voir les véhicules
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <div className="bg-success text-white rounded-circle d-inline-flex p-3 mb-3">
                                <i className="fas fa-shield-alt fa-2x"></i>
                            </div>
                            <h5 className="card-title">Sécurité Garantie</h5>
                            <p className="card-text">
                                Tous nos véhicules sont régulièrement entretenus et assurés
                            </p>
                            <a href="/conditions" className="btn btn-outline-success">
                                Nos garanties
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <div className="bg-warning text-white rounded-circle d-inline-flex p-3 mb-3">
                                <i className="fas fa-headset fa-2x"></i>
                            </div>
                            <h5 className="card-title">Support 24/7</h5>
                            <p className="card-text">
                                Notre équipe est disponible 24h/24 pour vous assister
                            </p>
                            <a href="/contact" className="btn btn-outline-warning">
                                Nous contacter
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-center">
                <h2 className="mb-4">Pourquoi choisir PremiumCar ?</h2>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <div className="p-3">
                            <i className="fas fa-check-circle text-success fa-2x mb-2"></i>
                            <h6>Réservation Facile</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="p-3">
                            <i className="fas fa-check-circle text-success fa-2x mb-2"></i>
                            <h6>Prix Transparents</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="p-3">
                            <i className="fas fa-check-circle text-success fa-2x mb-2"></i>
                            <h6>Véhicules Récents</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="p-3">
                            <i className="fas fa-check-circle text-success fa-2x mb-2"></i>
                            <h6>Assurance Complète</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;