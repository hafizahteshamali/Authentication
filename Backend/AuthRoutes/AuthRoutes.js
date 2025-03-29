import express from 'express';
import { ForgotPasswordController, LoginController, LogoutController, ResetPasswordController, SignupController } from '../Controllers/AuthController.js';

export const AuthRoutes = express.Router();

AuthRoutes.post('/signup', SignupController);
AuthRoutes.post('/login', LoginController);
AuthRoutes.post('/logout', LogoutController);
AuthRoutes.post('/forgot-password', ForgotPasswordController);
AuthRoutes.post('/reset-password/:token', ResetPasswordController);