// src/pages/Login.jsx
import { useState } from "react";
import authService from "../api/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ← Changement ici

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await authService.login({ username, password });
            console.log("Réponse complète login:", res);
            console.log("Data:", res.data);
            console.log("Token:", res.data.token);
            console.log("Type de token:", typeof res.data.token);

            const token = res.data.token;

            // Vérifiez le format du token
            console.log("Token length:", token.length);
            console.log("Token parts:", token.split('.').length);
            console.log("Token preview:", token.substring(0, 50) + "...");

            // Testez si c'est un JWT valide
            try {
                const decoded = jwtDecode(token);
                console.log("JWT décodé:", decoded);
                const role = decoded.roles?.[0] || "ROLE_USER";
                login(token, role);
                navigate("/voitures");
            } catch (jwtError) {
                console.error("Erreur décodage JWT:", jwtError);
                setError("Token JWT invalide");
            }

        } catch (err) {
            console.error("Erreur de connexion:", err);
            setError("Nom d'utilisateur ou mot de passe incorrect");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Connexion à votre compte
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Nom d'utilisateur
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Nom d'utilisateur"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Se connecter
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <a
                            href="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Créer un compte
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;