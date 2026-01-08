// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import VoituresAdmin from "./pages/admin/VoituresAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import MaintenancesAdmin from "./pages/admin/MaintenancesAdmin";
import Dashboard from "./pages/admin/Dashboard";
import PaiementsAdmin from "./pages/admin/PaiementsAdmin";
import ReservationsAdmin from "./pages/admin/ReservationsAdmin";
import VoitureList from "./pages/user/VoitureList";
import PaiementPage from "./pages/user/PaiementPage";
import MesReservations from "./pages/user/MesReservations";
import ProtectedRoute from "./components/ProtectedRoute"; 



export default function App() {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                   
              
                    
                    <Route path="/admin/voitures" element={
                        <ProtectedRoute>
                          
                                <VoituresAdmin />
                   
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/categories" element={
                        <ProtectedRoute>
                  
                                <CategoriesAdmin />
                          
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/maintenances" element={
                        <ProtectedRoute>
                       
                                <MaintenancesAdmin />
                         
                        </ProtectedRoute>

                    } />
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute>
                     
                                <Dashboard />
                   
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/reservations" element={
                        <ProtectedRoute>
                            
                                <ReservationsAdmin />
                            
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/paiements" element={
                        <ProtectedRoute>
                          
                                <PaiementsAdmin />
                         
                        </ProtectedRoute>
                    } />
                    <Route path="/user/voitures" element={
                        <ProtectedRoute>
                           
                                <VoitureList />
                       
                        </ProtectedRoute>
                    } />
                    <Route path="/user/reservations" element={
                        <ProtectedRoute>
                        
                                <MesReservations />
                       
                        </ProtectedRoute>
                    } />
                   
                    <Route path="/paiement/:reservationId" element={
                        <ProtectedRoute>
                           
                                <PaiementPage />
                          
                        </ProtectedRoute>
                    } />



                    {/* Routes sans layout (fullscreen) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path ="/" element={<Home />} />

                  
                     
                </Routes>
            </Router>
        </AuthProvider>
    );
}