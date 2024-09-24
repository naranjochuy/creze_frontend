import { useState } from "react";
import { Link } from "react-router-dom"
import { useForm } from "../hooks";
import { Form, InputText, SubmitButton } from "../components";
import { serviceMFADisable } from "../services/services";
import * as Yup from 'yup';

export const OTPDisable = () => {

    const { code, onInputChange, formState,
        setErrors, errors } = useForm({
            code: ''
        });
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const urlBack = localStorage.getItem('otpVerified') ? '/otpvalidate' : '/otpsetup'
    const validationSchema = Yup.object().shape({
        code: Yup.string()
          .required('El código es obligatorio'),
      });

    const onActivate = async(e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formState, { abortEarly: false });
            const resp = await serviceMFADisable(formState);
            const { data, status } = resp;
            if (status == 200){
                localStorage.clear();
                setStep(2);
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
            { step == 1 ?
                <Form title="Deshabilitar MFA">
                    { error &&
                        <div className="div-error">
                            <p>{ error }</p>
                        </div>
                    }
                    <InputText
                        type="password"
                        _key="code"
                        label="Código"
                        value={ code }
                        onInputChange={ onInputChange }
                        error={ errors['code'] }
                        autoFocus
                    />
                    <SubmitButton
                        label="Desahbilitar"
                        onSubmit={ onActivate }
                    />
                    <Link
                        className="btn-secondary"
                        to={ urlBack }
                    >
                        Regresar
                    </Link>
                </Form>
            :
                <div className="auth-container">
                    <form className="auth-form">
                        <h2 className="text-center">¡Felicidades!</h2>
                        <p className="text-center">Has activado desactivado correctamente la autenticación de doble factor.</p>
                        <p className="recovery-codes-instructions">
                            A continuación, ve a tu panel y activa nuevamente la autenticación de doble factor.
                        </p>
                        <Link className="btn-primary" to="/">Ir al panel</Link>
                    </form>
                </div>
            }
        </div>
    )
}
