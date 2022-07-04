import express from "express";

import {forgetPassword ,resetPassword,validateResetPassword} from "../Controller/ResetPassword.controller.js";
const router = express.Router();


//reset password
router.post("/forget-password", forgetPassword);
router.route("/reset-password").post(resetPassword);



    export default router;
