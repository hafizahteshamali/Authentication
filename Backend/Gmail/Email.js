import dotenv from 'dotenv';
import { transporter } from './EmailSender.js';

export const sendResetEmail = async (Email, url) => {
    try {
        const mailOptions = {
            from: process.env.PORTAL_EMAIL,
            to: Email,
            subject: 'Password Reset Request',
            html: `
                <p><strong>Click the link below to reset your password</strong></p>
                <a href="${url}">Reset Password</a>
            `, // Use 'html' instead of 'text' for HTML content
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Reset Email sent to ${Email} - ${info.response}`);
    } catch (error) {
        console.log('Error sending reset email:', error);
    }
};
