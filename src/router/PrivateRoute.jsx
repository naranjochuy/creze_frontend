import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const logged = localStorage.getItem('logged');
    return (logged) ? children : <Navigate to="/login" />
}
