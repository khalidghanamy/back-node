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
// import Auth from "./Routes/Auth.js";
// import ResetPassword from "./Routes/ResetPassword.js";
// import Tasks from "./Routes/Tasks.js";
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
app.post("/get-location", async (req, res,next) => {
    console.log(req.body);

    let remoteAddress = req.connection.remoteAddress;

    let data = {
        ip: req.header('x-forwarded-for') || remoteAddress.split(":")[3],
        name: req.body.name
    }
    try {
        let user = new User(data);
        console.log(user);
        let newUser = await user.save();
        console.log(newUser);
        res.send(user);
    } catch (err) {
next(err);
    }

});
// app.use("/auth", Auth);
// app.use(ResetPassword);
// app.use("/tasks", Tasks);

//====> Deployment <========================================

const __filename = fileURLToPath(import.meta.url);

let __dirname = path.dirname(__filename);
// const dirname = __dirname.split("/")
// console.log(dirname.pop());
//  __dirname =dirname.join("/");

console.log('directory-name 👉️', __dirname);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"/build/index.html"));
        // console.log(path.resolve(__dirname,"client","build","index.html"));
    } 
    )
}
//====> Middleware <========================================

app.use(errorHandler);
app.use(notFound);
