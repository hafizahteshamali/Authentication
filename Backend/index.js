import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DBConnection from './DbConnection/DbConnection.js';
import { AuthRoutes } from './AuthRoutes/AuthRoutes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.send("Backend to Authentication Server");
})

app.use('/auth/api', AuthRoutes)

DBConnection();

app.listen(PORT, ()=>{
    console.log("Server Start Successfully");
})