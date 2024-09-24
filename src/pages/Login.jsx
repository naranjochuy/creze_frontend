import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "../hooks";
import { Form, InputText, SubmitButton } from "../components";
import { serviceLogIn } from '../services/services';
import * as Yup from 'yup';

export const Login = () => {

    const navigate = useNavigate()
    const { email, password, onInputChange, formState,
        setErrors, errors } = useForm({
            email: '',
            password: ''
        });
    const [error, setError] = useState('');
    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .required('El correo electrónico es obligatorio')
          .email('El correo electrónico no es válido'),
        password: Yup.string()
          .required('La contraseña es obligatoria'),
    });

    const onLogIn = async(e) => {
        e.preventDefault();
        setError('');
        try {
            await validationSchema.validate(formState, { abortEarly: false });
            const resp = await serviceLogIn(formState);
            const { data, status } = resp;
            if (status == 200){
                const { otp_activated, otp_verified, token } = data;
                localStorage.setItem('logged', "1");
                localStorage.setItem('token', token);
                if (otp_activated){
                    if (otp_verified)
                        navigate('/otpvalidate', { replace: true });
                    else
                        navigate('/otpsetup', { replace: true });
                }
                else
                    navigate('/', { replace: true });
            }
            else if (status == 400)
                setErrors(data);
            else if (status == 401)
                setError(data.detail);
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    }

    return (
        <div className="auth-container">
            <Form title="Iniciar Sesión">
                { error &&
                    <div className="div-error">
                        <p>{ error }</p>
                    </div>
                }
                <InputText
                    type="email"
                    _key="email"
                    label="Correo electrónico"
                    value={ email }
                    onInputChange={ onInputChange }
                    autoFocus
                    error={ errors['email'] }
                />
                <InputText
                    type="password"
                    _key="password"
                    label="Contraseña"
                    value={ password }
                    onInputChange={ onInputChange }
                    error={ errors['password'] }
                />
                <SubmitButton
                    label="Iniciar Sesión"
                    onSubmit={ onLogIn }
                />
                <Link
                    className="btn-secondary"
                    to="/signup"
                >
                    Regístrate
                </Link>
            </Form>
        </div>
    )
}
