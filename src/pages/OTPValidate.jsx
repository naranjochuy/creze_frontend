import { Link, useNavigate } from "react-router-dom"
import { useForm } from '../hooks';
import { Form, InputText, SubmitButton } from "../components";
import { serviceMFAValidate } from '../services/services';
import * as Yup from 'yup';

export const OTPValidate = () => {

    const navigate = useNavigate()
    const { code, onInputChange, formState,
        setErrors, errors } = useForm({
            code: ''
        });
        const validationSchema = Yup.object().shape({
            code: Yup.string()
              .required('El código es obligatorio'),
        });

    const onVerify = async(e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formState, { abortEarly: false });
            const resp = await serviceMFAValidate(formState);
            const { data, status } = resp;
            if (status == 200){
                navigate('/', { replace: true });
            }
            else if (status == 400)
                setErrors(data);
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
            <Form title="Validar doble autenticación">
                <InputText
                    _key="code"
                    label="Introduce el Código"
                    value={ code }
                    onInputChange={ onInputChange }
                    autoFocus
                    error={ errors['code'] }
                />
                <SubmitButton
                    label="Validar"
                    onSubmit={ onVerify }
                />
                <Link
                    className="btn-secondary"
                    to="/otpdisable"
                >
                    Deshabilitar MFA
                </Link>
            </Form>
        </div>
    )
}
