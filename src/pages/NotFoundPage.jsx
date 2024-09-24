import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className="auth-container">
            <form className="auth-form">
                <h2 className="text-center">404 - Página no encontrada</h2>
                <p className="text-center">Lo sentimos, la página que estás buscando no existe.</p>
                <Link className="btn-primary" to="/">Volver al inicio</Link>
            </form>
        </div>
    );
};
