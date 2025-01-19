import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.PORTAL_EMAIL,
        pass: process.env.PORTAL_PASSWORD,
    },tls: {
        rejectUnauthorized: false
    }
})