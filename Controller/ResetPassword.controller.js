import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import sendMail from '../Utils/Mail/SendMail.js';

export const forgetPassword = async (req, res,next) => {
    console.log( req.body);
    try {
        // make sure user exist in database
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({status:false, msg: 'Invalid email' });
        }
        const payload = {
            user: {
                id: user.id,
                email: user.email
            }
        }
        
        const secret = process.env.JWT_SECRET + user.password;
       //create token and link valid for 30 minutes
       const token= jwt.sign(payload,secret, { expiresIn: '30m' });

       // create link to reset password
       const localLink='http://localhost:3000'
        const link = `${process.env.RESET_LINK || localLink }/resetpassword/${user.id}/${token}`;
        
        // send email to user with link
        
        await sendMail(user.email,link);

        return res.status(200).json({status:true, msg: 'Email has been sent'}); 
    } catch (error) {
          next(error);
      
    }
}


export const validateResetPassword = async (req, res,next) => {

    const { id, token } = req.params;
    try {
    //check if user exist in database
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({status:false, msg: 'User does not exist' });
        }
    //check if token is valid
        const secret = process.env.JWT_SECRET + user.password;
        const payload = jwt.verify(token, secret);
        return res.status(200).json({ email: user.email });

    }catch (error) {
        next(error);
    }
}

export const resetPassword = async (req, res,next) => {

    const { id, token,password } = req.body;
    try {
    //check if user exist in database
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({status:false, msg: 'User does not exist' });
        }
    //check if token is valid
        try {
            const secret = process.env.JWT_SECRET + user.password;
            const payload = jwt.verify(token, secret);
        } catch (error) {
            return res.status(400).json({status:false, msg: 'Invalid token' });

        }
        
    //update password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({status:true, msg: 'Password has been updated' });
        

    }catch (error) {
        next(error);
    }
}