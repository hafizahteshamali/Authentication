import AllUser from "../DatabaseModel/AuthModel.js";
import bcrypt from 'bcryptjs';
import GenerateToken from "../helper/GenerateToken.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { sendResetEmail } from "../Gmail/Email.js";

dotenv.config();


const SignupController = ('/', async(req, res)=>{
    try {
        const {Name, Email, Password} = req.body;
        
        if(!Name || !Email || !Password){
            return res.status(400).send({status: 400, message: "all fields are required"});
        }

        const AlreadyUser = await AllUser.findOne({Email});

        if(AlreadyUser){
            return res.status(400).send({status: 400, message: "user already registed in database"});
        }

        const encrypPass = await bcrypt.hash(Password, 10);

        const Response = await AllUser.create({
            Name,
            Email,
            Password: encrypPass
        })

        return res.status(201).send({status: 201, message: "user registerd successfully", Response});

    } catch (error) {
        console.log(error.message);
    }
})

const LoginController = ('/', async(req, res)=>{
    try {
        const {Email, Password, Role} = req.body;

        if(!Email || !Password || !Role){
            return res.status(400).send({status: 400, message: "all inputs are required"});
        }

        const UserFound = await AllUser.findOne({Email});

        if(!UserFound){
            return res.status(400).send({status: 400, message: "user not found..!"});
        }

        const passwordCheck = await bcrypt.compare(Password, UserFound.Password);

        if(!passwordCheck){
            return res.status(400).send({status: 400, message: "invalid credentials"});
        }

        const token = jwt.sign({ id: UserFound?._id }, process.env.JWT_TOKEN);

        return res.status(201).send({status: 201, message: "user login successfully", token, UserFound});
    } catch (error) {
        console.log(error.message);
    }
})

const LogoutController = ('/', (req, res)=>{
    try {
        return res.status(201).send({status: 201, message: "user logout successfully"});
    } catch (error) {
        console.log(error.message);
    }
})

const ForgotPasswordController = ('/', async(req, res)=>{
    try {
        const { Email } = req.body;

        if(!Email){
            return res.status(400).send({status: 400, message: "email is required"});
        }

        const UserFound = await AllUser.findOne({ Email });

        if(!UserFound){
            return res.status(400).send({status: 400, message: "user not found..!"});
        }

        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpire = Date.now() + 360000;

        UserFound.ResetPasswordToken = token;
        UserFound.ExpireResetPasswordToken = tokenExpire;

        await UserFound.save();

        const resetLink = `http://localhost:5173/resetpassword/${token}`;

       await sendResetEmail(Email, resetLink);

       res.status(200).json({status: 200, message: "password reset email send successfully"});
    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
    }
})


const ResetPasswordController = ('/', async(req, res)=>{
    try {
        const { newPassword, confirmPassword } = req.body;
        const token = req.params.token; 
        if(!newPassword || !confirmPassword || !token){
            return res.status(400).send({status: 400, message: "all inputs are required"})
        }
        if(newPassword !== confirmPassword){
            return res.status(400).send({status: 400, message: "current password and confirm password does not match"});
        }
        const user = await AllUser.findOne({ResetPasswordToken: token});
        if(!user){
            return res.status(400).send({status: 400, message: "Invalid or expire token"});
        }
        const now = Date.now();
        if(user.ExpireResetPasswordToken < now){
            return res.status(400).send({ status: 400, message: "Token has expired" });
        }
        const encryptPass = await bcrypt.hash(newPassword, 10);
        user.Password = encryptPass;
        user.ResetPasswordToken = undefined;
        user.ExpireResetPasswordToken = undefined;
        await user.save();
        res.status(201).send({status: 201, message: "Password reset successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Internal Server Error", error: error.message });
    }
})

export {SignupController, LoginController, LogoutController, ForgotPasswordController, ResetPasswordController};
