import express from "express";
import {createTask,getTasks,getOneTask,updateTask,deleteTask} from '../Controller/Tasks.controller.js'
const router = express.Router();



router.post("/create/:userId",createTask);
router.get("/read/:userId",getTasks);

router.route("/:id")
    .get(getOneTask)
    .put(updateTask)
    .delete(deleteTask);



export default router;