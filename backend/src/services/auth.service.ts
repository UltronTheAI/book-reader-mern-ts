import User from "../models/User";
import bcrypt from "bcrypt";
import { generateRandomCode } from "../utils/generator.utils";


//register user 
// generate and save verification token 
//default isVerified false
//verificationToken should expire in 1hr 
export async function registerUser(username: string, email: string, password: string) {
    
    const currentUser = await User.findOne({email}); 
    if(currentUser){ //if email exists error
        throw new Error('Email already exists ');
    }
    
    const verificationToken = generateRandomCode();
    if( !verificationToken){
        throw new Error('Failed to generate verification token');
    }

    const expires = new Date(Date.now() + 1000 * 60 * 60 );//1hr expiration
 
    const role = "reader";
    const hashedpassword = await bcrypt.hash(password,10);
    const newUser = new User({
        username,
        email,
        password: hashedpassword,
        role,
        isVerified: false,
        verificationToken: verificationToken,
        verificationTokenExpires: expires,
    });
    const savedUser = await newUser.save();
    if(!savedUser){
        throw new Error('Failed to register user properly. Could not saved');
    }
    return savedUser;
}

//find user by verification token 
//if found change users isVerfied to true
export async function verifyEmail(email: string, token: string) {
    const user = await User.findOne({
        email: email,
        verificationToken: token,
        verificationTokenExpires:{ $gt: new Date()} //if expring time is greater than current time
    });
    if (!user){
        throw new Error('User not found or token has expired');
    } 
    if( user.isEmailVerified){
        throw new Error(`User's Email verified already!!!. You can login`);
    }
  
    user.isEmailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    
    await user.save();
    return user;
}

//authenticate user to login
export async function authenticateUser(email: string, password: string) {                
    const currentUser = await User.findOne({email}); 
    if(!currentUser){ //if email doesnot exists error
        throw new Error('Could not found exsting User');
    }

    const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);
    if(!isPasswordCorrect){
        throw new Error('Wrong credentials try again');
    }
    return currentUser;
}
 

//if user exists and 
//if user is not verified then
//refresh verification token of  user
export async function refreshVerificationToken(email: string) {
    const user = await User.findOne( {email} );
    if( !user) {
    throw new Error('User not found ');
    }

    if( user.isEmailVerified) {
        throw new Error('Users Email verified already!!!. You can login');
    }

    //verificationTokenExpires has 60 min+ while being created
    //tokenDate < current date  -> expired
    //tokenDate > current date  -> not expired
    // if(user.verificationTokenExpires && user.verificationTokenExpires >= new Date()){
    //     throw new Error('Use existing verification token. It is usable for 60 min. ');
    // }

    const newToken = generateRandomCode();
    const newExpires = new Date(Date.now() + 1000 * 60 * 60 );//1hr expiration
    user.verificationToken = newToken;
    user.verificationTokenExpires = newExpires;

    await user.save();
    return user;
}