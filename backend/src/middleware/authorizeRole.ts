import { NextFunction, Request, Response } from "express";

//middleware to check if user has authorized roles 
export default function authorizeRole(...allowedRoles: string[]){
    return ( req: Request, res: Response, next: NextFunction): void =>{
        if(!req.user){
            void res.status(401).json({ message: "Not authenticated" });
            return;
        }
        if(!allowedRoles.includes(req.user.role)){
            void res.status(403).json({ message: "You do not have permission" });
            return;
        }
        next();
    }
}