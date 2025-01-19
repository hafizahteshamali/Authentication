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
            res.status(400).send({status: 400, message: "all fields are required"});
        }

        const AlreadyUser = await AllUser.findOne({Email});

        if(AlreadyUser){
            res.status(400).send({status: 400, message: "user already registed in database"});
        }

        const encrypPass = await bcrypt.hash(Password, 10);

        const Response = await AllUser.create({
            Name,
            Email,
            Password: encrypPass
        })

        res.status(201).send({status: 201, message: "user registerd successfully", Response});

    } catch (error) {
        console.log(error.message);
    }
})

const LoginController = ('/', async(req, res)=>{
    try {
        const {Email, Password, Role} = req.body;

        if(!Email || !Password || !Role){
            res.status(400).send({status: 400, message: "all inputs are required"});
        }

        const UserFound = await AllUser.findOne({Email});

        if(!UserFound){
            res.status(400).send({status: 400, message: "user not found..!"});
        }

        const passwordCheck = await bcrypt.compare(Password, UserFound.Password);

        if(!passwordCheck){
            res.status(400).send({status: 400, message: "invalid credentials"});
        }

        const token = jwt.sign({ id: UserFound?._id }, process.env.JWT_TOKEN);

        res.status(201).send({status: 201, message: "user login successfully", token, UserFound});
    } catch (error) {
        console.log(error.message);
    }
})

const LogoutController = ('/', (req, res)=>{
    try {
        res.status(201).send({status: 201, message: "user logout successfully"});
    } catch (error) {
        console.log(error.message);
    }
})

const ForgotPasswordController = ('/', async(req, res)=>{
    try {
        const {Email} = req.body;

        if(!Email){
            res.status(400).send({status: 400, message: "email is required"});
        }

        const UserFound = await AllUser.findOne({Email});

        if(!userFound){
            res.status(400).send({status: 400, message: "user not found..!"});
        }

        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpire = Date.now() + 360000;

        userFound.ResetPasswordToken = token;
        userFound.ExpireResetPasswordToken = tokenExpire;

        await userFound.save();

       await sendResetEmail(Email, `http://localhost:5173/reset-password/${token}`);
    } catch (error) {
        console.log(error.message);
    }
})

export {SignupController, LoginController, LogoutController, ForgotPasswordController};
