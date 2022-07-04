import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from 'url';

//=====================================================
import connectToDb from "./Database/connection.js";
import errorHandler from "./Middlewares/errorMiddleware.js";
import notFound from "./Middlewares/notFoundMiddleware.js";
import Auth from "./Routes/Auth.js";
import ResetPassword from "./Routes/ResetPassword.js";
import Tasks from "./Routes/Tasks.js";
//=====================================================
// Load environment variables from .env file
dotenv.config();


//==== Create server =============================
const app = express()
const app_port = process.env.PORT || 4000;
const server =()=>{
    app.listen(app_port,()=>{ console.log(`Server is running on port ${process.env.PORT} `);})
}

connectToDb(process.env.MONGO_URI,server);

//======================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//====> Routes <========================================

app.use("/auth", Auth);
app.use(ResetPassword);
app.use("/tasks", Tasks);


//====> Middleware <========================================

app.use(errorHandler);
app.use(notFound);
