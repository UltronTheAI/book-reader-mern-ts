import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import * as jwtUtils from '../utils/generator.utils';
import {sendVerificationMail} from '../services/mail.service';


//registering user
//takes username else default  
//role is default to reader
//requires email n password
//register user with verification tokens and expiration
//send verification token to users email
//send jwt token to login
export async function registerUser(req: Request, res: Response): Promise<void>  {
    try {
        const {username, email, password} = req.body;
        //register without role 
        //not taking role as input from user  
        const newUser = await authService.registerUser(username, email, password);
        
        //send mail to verify users email 
        await sendVerificationMail(newUser.email, newUser.verificationToken!);

        //generate token with additional info
        //then jwt will contain this info always
        const token = await jwtUtils.generateToken(
            newUser._id.toString(),
            newUser.email,
            newUser.role,
            newUser.isEmailVerified
        );
        res.status(201).json({
            success: true,
            token: token,//jwt token 
            message: `user has been successfully registered.You can now verify email or login `
        });    
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        return;
    }
}

//takes and verify email n password
//if success generates jwt token
//user dont need to have verified email to login
export async function loginuser(req: Request, res: Response): Promise<void>  {
    try {  
        const { email, password } = req.body;
        if(!email || !password){
            res.status(500).json( {success: false, message: `Email and password are required` });
            return;
        }

        const currentUser = await authService.authenticateUser(email, password);
        const token = await jwtUtils.generateToken(
            currentUser._id.toString(), currentUser.email, currentUser.role, currentUser.isEmailVerified
        );
        res.status(200).json({
            success: true,
            message: `user has been successfully loggedIn`,
            access_token: token
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        return;
    }
}

//verify users mail
//take users email n token
//if same token and email as stored on db then email will be verified
//if already verified verification will fail
//email verification needs to be done first before login 
export async function verifyEmail(req: Request, res: Response): Promise<void>  {
    try {
        const { token } = req.params; //from url params
        const { email } = req.body; 
        if (!token || typeof token !== "string") {
            res.status(400).send({ success: false, message:"Token is required"});
            return;
        } 
        if (!email || typeof email !== "string") {
            res.status(400).send({ success: false, message:"email is required"});
            return;
        } 

        const user = await authService.verifyEmail(email, token);
        res.status(200).json({ success: true, message: "Email successfully verified!" });
    } catch (error: any) {
         res.status(500).json({ error: error.message });
        return;
    }
}


//new verification token will be sent if existing token expired 
//if expired then send new verification token
//and stores verification token & expiration
export async function resendVerificationEmail(req: Request, res: Response): Promise<void> {
  try {
    const {email}  = req.body;
    if (!email || typeof email !== "string") {
      res.status(400).json({ success: false, message: "Email is required" });
      return;
    }

    const updatedUser = await authService.refreshVerificationToken(email);

    //send mail to verify users email 
    await sendVerificationMail(updatedUser.email, updatedUser.verificationToken!);

    res.status(200).json({
      success: true,
      message: "Verification email has been resent. You can verify email or login"
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}