import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "../hooks";
import { Layout } from '../components';
import { Form, InputText, SubmitButton } from "../components";
import { serviceMFAActivate } from "../services/services";
import * as Yup from 'yup';

export const OTPActivate = () => {
    
    const navigate = useNavigate()
    const { password, onInputChange, formState,
        setErrors, errors } = useForm({
            password: ''
        });
    const [error, setError] = useState('');
    const validationSchema = Yup.object().shape({
        password: Yup.string()
          .required('La contraseña es obligatoria'),
    });
    const onActivate = async(e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formState, { abortEarly: false });
            const resp = await serviceMFAActivate(formState);
            const { data, status } = resp;
            if (status == 200){
                localStorage.clear();
                navigate('/login', { replace: true });
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
        <Layout>
            <div className="auth-container">
                <Form title="Activar OTP">
                    { error &&
                        <div className="div-error">
                            <p>{ error }</p>
                        </div>
                    }
                    <InputText
                        type="password"
                        _key="password"
                        label="Contraseña"
                        value={ password }
                        onInputChange={ onInputChange }
                        error={ errors['password'] }
                        autoFocus
                    />
                    <SubmitButton
                        label="Activar"
                        onSubmit={ onActivate }
                    />
                </Form>
            </div>
        </Layout>
    )
}
