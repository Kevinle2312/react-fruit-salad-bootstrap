import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hook d'authentification personnalisé
const useAuth = () => {

    const checkAuthentication = () => {
        const accessToken = localStorage.getItem("token"); // Récupération du jeton d'accès depuis le stockage local

        // Vérifiez si le jeton d'accès existe et s'il est valide
        if (accessToken) {
            // Retournez true si le jeton est valide, false sinon
            return true;
        }

        return false;
    };
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifiez ici si l'utilisateur est connecté
        const isAuthenticated = checkAuthentication(); // Appel à une fonction de vérification d'authentification personnalisée

        // Si l'utilisateur n'est pas connecté, redirigez vers la page de connexion
        if (!isAuthenticated) {
            navigate("/connexion");
        }
    }, [navigate("")]);

    return null; // ou retournez l'état d'authentification si nécessaire
};

export default useAuth;
