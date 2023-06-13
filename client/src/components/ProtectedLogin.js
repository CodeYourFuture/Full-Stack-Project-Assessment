import { Navigate } from "react-router-dom"

export default function ProtectedLogin({ children }) {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" />;
}