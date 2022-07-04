import express from "express";
import {createTask,getTasks,getOneTask,updateTask,deleteTask} from '../Controller/Tasks.controller.js'
import { verifyToken,verifyUser } from "../Utils/verifyToken.js"
const router = express.Router();



router.post("/create/:userId",verifyUser,createTask);
router.get("/read/:userId",verifyUser,getTasks);

router.route("/:id")
    .get(verifyToken,getOneTask)
    .put(verifyToken,updateTask)
    .delete(verifyToken,deleteTask);



export default router;