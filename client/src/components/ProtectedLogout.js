import { Navigate } from "react-router-dom"

export default function ProtectedLogout({ children }) {
    const token = localStorage.getItem("token");

    return !token ? children : <Navigate to="/videos" />;
}