import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
    const logged = localStorage.getItem('logged');
    return (!logged) ? children : <Navigate to="/" />
}
