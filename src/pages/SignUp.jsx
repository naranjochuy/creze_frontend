import { useState } from "react";
import { Link } from "react-router-dom"
import { useForm } from "../hooks";
import { Form, InputText, SubmitButton } from "../components";
import { serviceSignUp } from "../services/services";
import * as Yup from 'yup';

export const SignUp = () => {

    const [step, setStep] = useState(1);
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


    const onSingUp = async(e) => {
        e.preventDefault();
        setError('');
        try {
            await validationSchema.validate(formState, { abortEarly: false });
            const resp = await serviceSignUp(formState);
            if (resp.status == 201)
                setStep(2);
            else if (resp.status == 400)
                setErrors(resp.data);
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
            { step == 1 ?
                <Form title="Registro">
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
                        label="Registrarse"
                        onSubmit={ onSingUp }
                    />
                    <Link
                        className="btn-secondary"
                        to="/login"
                    >
                        Inicia sesión
                    </Link>
                </Form>
            :
                <div className="auth-container">
                    <form className="auth-form">
                        <h2 className="text-center">¡Felicidades!</h2>
                        <p className="text-center">Tu registro fue exitoso, ahora puedes iniciar sesión.</p>
                        <Link className="btn-primary" to="/login">Inicia sesión</Link>
                    </form>
                </div>
            }
        </div>
    )
}
