import { Route, Routes } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import {
    Login,
    Dashboard,
    NotFoundPage,
    SignUp,
    OTPSetup,
    OTPValidate,
    OTPActivate,
    OTPDisable
} from '../pages';



export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/signup" element={ <PublicRoute><SignUp /></PublicRoute> } />
                <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> } />
                <Route path="/" element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
                <Route path="/otpsetup" element={ <PrivateRoute><OTPSetup /></PrivateRoute> } />
                <Route path="/otpvalidate" element={ <PrivateRoute><OTPValidate /></PrivateRoute> } />
                <Route path="/otpactivate" element={ <PrivateRoute><OTPActivate /></PrivateRoute> } />
                <Route path="/otpdisable" element={ <PrivateRoute><OTPDisable /></PrivateRoute> } />
                <Route path="*" element={ <NotFoundPage /> } />
            </Routes>
        </>
    )
}
