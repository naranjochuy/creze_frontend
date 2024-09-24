import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { QRCodeSVG } from 'qrcode.react';
import { useForm } from '../hooks';
import { Form, InputText, SubmitButton } from "../components";
import { serviceMFASetup, serviceMFAValidate } from '../services/services';
import * as Yup from 'yup';

export const OTPSetup = () => {
    const [url, setUrl] = useState('');
    const [step, setStep] = useState(1);
    const [codes, setCodes] = useState([]);
    const [showCodes, setShowCodes] = useState(false);

    const navigate = useNavigate()
    const { code, onInputChange, formState,
        setErrors, errors } = useForm({
            code: ''
        });
    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required('El Código es obligatorio'),
    });

    const onVerify = async(e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formState, { abortEarly: false });
            const resp = await serviceMFAValidate(formState);
            const { data, status } = resp;
            setCodes(data?.recovery_codes || [])
            if (status == 200)
                setStep(2);
            else if (status == 400)
                setErrors(data);
            else if (status == 401){
                localStorage.clear()
                navigate('/login', { replace: true })
            }
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    }

    const setupMFA = async() => {
        const resp = await serviceMFASetup();
        const { data } = resp
        setUrl(data.otp_uri)
    }

    useEffect(() => {
        setupMFA();
    }, [])

    return (
        <div className="auth-container">
            { step == 1 ?
                <Form title="Doble Autenticación">
                    <InputText
                        _key="code"
                        label="Introduce el Código"
                        value={ code }
                        onInputChange={ onInputChange }
                        autoFocus
                        error={ errors['code'] }
                    />
                    <div className="qr-code">
                        <QRCodeSVG value={ url } />
                        <p className="qr-code-txt">Escanea el código QR para autenticarte</p>
                    </div>
                    <SubmitButton
                        label="Verificar"
                        onSubmit={ onVerify }
                    />
                    <Link
                        className="btn-secondary"
                        to="/otpdisable"
                    >
                        Deshabilitar MFA
                    </Link>
                </Form>
            :
                <div className="auth-container">
                    <form className="auth-form">
                        <h2 className="text-center">¡Felicidades!</h2>
                        <p className="text-center">Has activado correctamente la autenticación de doble factor.</p>
                        { codes.length > 0 && 
                        <>
                            <p className="recovery-codes-instructions">
                                A continuación, se muestran tus códigos de recuperación. Estos códigos son importantes, ya que te permitirán acceder a tu cuenta en caso de que pierdas el acceso a tu aplicación de autenticación. Guarda estos códigos en un lugar seguro.
                            </p>
                            { !showCodes &&
                                <button 
                                    type="button" 
                                    className="show-codes-button" 
                                    onClick={() => setShowCodes(!showCodes)}
                                >
                                    Mostrar códigos
                                </button>
                            }
                            { showCodes && <>
                                <div>
                                    <table className="recovery-codes-table">
                                        <thead>
                                            <tr>
                                                <th>Códigos de Recuperación</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {codes.map((item) => (
                                                <tr key={item}>
                                                    <td>{item}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>}
                        </>
                        }
                        <Link className="btn-primary" to="/">Ir al panel</Link>
                    </form>
                </div>
            }
        </div>
    )
}
