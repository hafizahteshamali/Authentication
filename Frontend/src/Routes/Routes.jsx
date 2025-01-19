import ForgotPasswordForm from "../pages/ForgotPassword/ForgotPassword";
import LoginForm from "../pages/Login/Login";
import ResetPassword from "../pages/reset-password/ResetPassword";
import SignupForm from "../pages/Signup/Signup";

export const RoutesData = [
    {
        path: '/',
        element: <LoginForm />
    },
    {
        path: '/create-account',
        element: <SignupForm />
    },
    {
        path: '/forgotpassword',
        element: <ForgotPasswordForm />
    },
    {
        path: '/reset-password/:token',
        element: <ResetPassword />
    }
]