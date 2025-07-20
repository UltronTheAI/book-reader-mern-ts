import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { MyJwtPayload } from "../types";

const jwtSecretKey =process.env.JWT_SECRET_KEY;

export default function authenticateToken( req: Request, res: Response, next: NextFunction): void{
    if( !jwtSecretKey || typeof jwtSecretKey !== "string"){
    throw new Error("jwt is not defined or not string");
    }

    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
      void res.status(401).json({ message: 'JWT token is required' });
      return;
    }
    
    jsonwebtoken.verify(token, jwtSecretKey, (err, decodedInfo)  =>{
        if(err){
          void res.status(403).json({ message: 'Could not verify JWT token' });
          return;
        }
        // Attach decoded user info to request object
        //decodedInfo has id email role from jwt 
        req.user = decodedInfo as MyJwtPayload;
        next();
    })
}