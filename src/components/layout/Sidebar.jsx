import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SideBar = () => {
    const navigate = useNavigate();

    const onLogout = (e) => {
        e.preventDefault()
        localStorage.clear();
        navigate('/login', { replace: true });
    }

    return (
        <aside className="dashboard-sidebar">
            <ul>
                <li>
                    <Link to="/">
                        Panel
                    </Link>
                </li>
                <li>
                    <Link to="/otpactivate">
                        Activar OTP
                    </Link>
                </li>
                <li><a  onClick={ onLogout } href="#">Cerrar sesión</a></li>
            </ul>
        </aside>
    )
}
