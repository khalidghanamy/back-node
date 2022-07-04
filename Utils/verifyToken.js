import jwt from 'jsonwebtoken';
import { CreateError } from '../errorCreator/error.js';

export const verifyToken =
     (req, res, next) => {

        const token = req.cookies.access_token
        if (!token) {
            return next(CreateError(401, "No token provided"))
        }
        
        jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return next(CreateError(401, "Invalid token"))
            }
                req.user = user.user
                next()
             })
      

    }


export const verifyUser =
     (req, res, next) => {
         verifyToken(req, res, ()=> {
            if(req.user.id == req.params.id){
                next()
            }
            else{
                
                return next(CreateError(401, "Unauthorized"))
            }
    
        })
    }

